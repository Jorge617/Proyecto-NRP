import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { Requisito } from 'src/app/models/requisito';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { RequisitoService } from 'src/app/services/requisito.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DateAdapter } from '@angular/material/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-gestionar-tarea',
  templateUrl: './gestionar-tarea.component.html',
  styleUrls: ['./gestionar-tarea.component.css'],
  providers: [UsuarioService, ProyectoService, RequisitoService]
})
export class GestionarTareaComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "", [], 0);
  public proyecto: Proyecto; //Proyecto actual
  public tareasPriorizadas: Requisito[];
  public limiteEsfuerzo: Number;
  public tamanioListaTareas: Number | undefined;
  public tareasFueraLimiteEsfuerzo: any[];
  public limiteSuperado: boolean;
  public cambio1: boolean;
  public cambio2: boolean;
  public tareaSeleccionada: any;
  public posicion: any;
  public tareasValoradas: boolean;
  public controlTareas: boolean;

  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, private dateAdapter: DateAdapter<Date>,
    public route: ActivatedRoute, private _requisitoService: RequisitoService) {
    this.dateAdapter.setLocale('es-ES');
    this.proyecto = new Proyecto("k", "", [], new Date(), new Date(), [], "", "", [], 0, 0, 0, [], []);
    this.tareasPriorizadas = [];
    this.limiteEsfuerzo = 1;
    this.tareasFueraLimiteEsfuerzo = [];
    this.limiteSuperado = false;
    this.cambio1 = false;
    this.cambio2 = false;
    this.tareaSeleccionada = null;
    this.posicion = null;
    this.tareasValoradas = false;
    this.controlTareas = true;

  }

  ngOnInit(): void {
    this.getUserLogged();

    this.route.params.subscribe(async params => {
      this.getProyecto(params.id);

    });
  }

  formatearFecha(fecha: string): string {
    if (fecha.length != 10 && fecha.length != 9) {
      var fechaFormateada: string;
      var dia: string = "";
      var mes: string = "";
      var anio: string = "";
      dia = fecha.substring(8, 10);
      mes = fecha.substring(5, 7);
      anio = fecha.substring(0, 4);
      fechaFormateada = dia + "/" + mes + "/" + anio;
      return fechaFormateada;
    } else {
      return fecha
    }


  }
  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

  }
  getProyecto(id: any) {

    this._proyectoService.getProyecto(id).subscribe(
      response => {
        var aux = response.planificacion;
        this.proyecto._id = response._id;
        this.proyecto.nombre = response.nombre;
        this.proyecto.descripcion = response.descripcion;
        this.proyecto.fechaInicio = response.fechaInicio;
        this.proyecto.fechaFin = response.fechaFin;
        this.proyecto.usuarios = response.usuarios;
        this.proyecto.requisitos = response.requisitos;
        this.proyecto.idUsuario = this.usuario._id;
        this.proyecto.planificacion = []
        this.proyecto.esfuerzoMax = response.esfuerzoMax;
        this.proyecto.satisfaccionMax = response.satisfaccionMax;


        for (var i = 0; i < aux.length; i++) {
          aux[i].requisito.fechaInicio = this.formatearFecha(aux[i].requisito.fechaInicio.toString());
          aux[i].requisito.fechaFin = this.formatearFecha(aux[i].requisito.fechaFin.toString());

          this.proyecto.planificacion.push({ "requisito": aux[i].requisito, "importancia": aux[i].importancia, "coste": aux[i].coste, "productividad": Number(aux[i].importancia / aux[i].coste).toFixed(2) })


        }
        this.cargarRequisitosNoPriorizados();
      },
      error => {
        console.log(<any>error);
      }

    );

  }

  calcularPrioridad() {
    this.limiteSuperado = false;
    this.comprobarRequisitosPriorizados(this.proyecto._id);
    if (this.tareasValoradas == false) {

      this.controlTareas = false;
    } else {
      this.controlTareas = true;
    }
    console.log(this.controlTareas);
    if (this.tareasValoradas) {
      this.limiteEsfuerzo = Number($("#limite").val());
      if (Number($("#limite").val()) > 0) {
        this._proyectoService.calcularPrioridad(this.proyecto._id, $("#limite").val()).subscribe(response => {
          console.log(response)
          this.proyecto.planificacion = response;
          this.tamanioListaTareas = response.length;
          this.proyecto.esfuerzoMax = this.limiteEsfuerzo;
          this.tareasFueraLimiteEsfuerzo = []
          this.route.params.subscribe(params => {
            this.getProyecto(params.id);
          });

        }, error => {
          console.log(<any>error);
        });
      } else {
        this.limiteEsfuerzo = Number($("#limite").val());
      }
    }
  }
  remove(lista: any, elemento: any) {
    var i = lista.indexOf(elemento);


    if (i !== -1) {
      lista.splice(i, 1);
    }

  }

  intercambiarTareas(tareaSeleccionadaP?: any, posicionP?: any, tareaIntercambio?: any, posicionIntercambio?: any) {

    if (this.tareaSeleccionada == null) {
      this.tareaSeleccionada = tareaSeleccionadaP
      this.posicion = posicionP;



    } else {
      this.cambio1 = true;
    }

    if (this.cambio1 == true && this.cambio2 == false) {
      this.proyecto.planificacion[this.posicion] = tareaIntercambio;
      this.proyecto.planificacion[posicionIntercambio] = this.tareaSeleccionada;

      this.tareaSeleccionada = null;
      this.posicion = null;
      this.cambio1 = false;
      this.cambio2 = false;
    }

  }

  bajarTarea(indice: any) {
    this.limiteSuperado = false;
    this.tareaSeleccionada = null;
    this.posicion = null;
    this.cambio1 = false;
    this.cambio2 = false;
    this.tareasFueraLimiteEsfuerzo.push(this.proyecto.planificacion[indice]);
    this.remove(this.proyecto.planificacion, this.proyecto.planificacion[indice]);

  }

  subirTarea(indice: any) {
    var esfuerzoTotal = this.proyecto.esfuerzoMax;
    var esfuerzo = 0;
    this.tareaSeleccionada = null;
    this.posicion = null;
    this.cambio1 = false;
    this.cambio2 = false;
    for (var i = 0; i < this.proyecto.planificacion.length; i++) {
      esfuerzo += this.proyecto.planificacion[i].coste;
    }

    if ((esfuerzo + this.tareasFueraLimiteEsfuerzo[indice].coste) <= esfuerzoTotal) {
      this.limiteSuperado = false;
      this.proyecto.planificacion.push(this.tareasFueraLimiteEsfuerzo[indice]);
      this.remove(this.tareasFueraLimiteEsfuerzo, this.tareasFueraLimiteEsfuerzo[indice]);
    } else {
      this.limiteSuperado = true;
    }
  }


  cargarRequisitosNoPriorizados() {

    var aux: any[];
    aux = [];
    this.proyecto.planificacion.forEach(e => {

      aux.push(String(e.requisito._id))


    })

    this.proyecto.requisitos.forEach(e => {
      if (!aux.includes(String(e))) {

        this._requisitoService.calcularPrioridadRequisito(this.proyecto._id, e).subscribe(
          response => {

            var obj = { "requisito": response.requisito, "importancia": response.importancia, "coste": response.esfuerzo, "productividad": response.productividad }


            this.tareasFueraLimiteEsfuerzo.push(obj)
            this.tareasFueraLimiteEsfuerzo.forEach((e, indice) => {

              e.requisito.fechaInicio = this.formatearFecha(this.tareasFueraLimiteEsfuerzo[indice].requisito.fechaInicio.toString());
              e.requisito.fechaFin = this.formatearFecha(this.tareasFueraLimiteEsfuerzo[indice].requisito.fechaFin.toString());
            });
          }
        );
      }
    })

  }

  updatePrioridad(prioridad: any[]) {
    this._proyectoService.updatePrioridad(this.proyecto._id, prioridad).subscribe(response => {

    })
    this.limiteSuperado = false;
  }

  comprobarRequisitosPriorizados(idProyecto: any) {
    this._proyectoService.comprobarRequisitosPriorizados(idProyecto).subscribe(response => {

      this.tareasValoradas = response.priorizados;
    })
  }
}

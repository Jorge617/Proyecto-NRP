import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { Requisito } from 'src/app/models/requisito';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { RequisitoService } from 'src/app/services/requisito.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-gestionar-tarea',
  templateUrl: './gestionar-tarea.component.html',
  styleUrls: ['./gestionar-tarea.component.css'],
  providers: [UsuarioService, ProyectoService, RequisitoService]
})
export class GestionarTareaComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "", []);
  public proyecto: Proyecto; //Proyecto actual
  public tareasPriorizadas: Requisito[];
  public limiteEsfuerzo: Number;
  public tamanioListaTareas: Number | undefined;


  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, private dateAdapter: DateAdapter<Date>,
    public route: ActivatedRoute, private _requisitoService: RequisitoService) {
    this.dateAdapter.setLocale('es-ES');
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "", []);
    this.tareasPriorizadas = [];
    this.limiteEsfuerzo = 1;

  }

  ngOnInit(): void {
    this.getUserLogged();

    this.route.params.subscribe(params => {
      this.getProyecto(params.id);
    });
  }

  formatearFecha(fecha: string): string {
    var fechaFormateada: string;
    var dia: string = "";
    var mes: string = "";
    var anio: string = "";
    dia = fecha.substring(8, 10);
    mes = fecha.substring(5, 7);
    anio = fecha.substring(0, 4);


    fechaFormateada = dia + "/" + mes + "/" + anio;
    return fechaFormateada;
  }
  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

  }
  getProyecto(id: any) {
    this._proyectoService.getProyecto(id).subscribe(

      response => {
        this.proyecto._id = response._id;
        this.proyecto.nombre = response.nombre;
        this.proyecto.descripcion = response.descripcion;
        this.proyecto.fechaInicio = response.fechaInicio;
        this.proyecto.fechaFin = response.fechaFin;
        this.proyecto.usuarios = response.usuarios;
        this.proyecto.requisitos = response.requisitos;
        this.proyecto.idUsuario = this.usuario._id;
        this.proyecto.planificacion = response.planificacion;

        for (var i = 0; i < this.proyecto.planificacion.length; i++) {
          this.proyecto.planificacion[i].requisito.fechaInicio = this.formatearFecha(this.proyecto.planificacion[i].requisito.fechaInicio.toString());
          this.proyecto.planificacion[i].requisito.fechaFin = this.formatearFecha(this.proyecto.planificacion[i].requisito.fechaFin.toString());
        }

      },
      error => {
        console.log(<any>error);
      }

    );

  }

  calcularPrioridad() {
    this.limiteEsfuerzo = Number($("#limite").val());
    if (Number($("#limite").val()) > 0) {
      this._proyectoService.calcularPrioridad(this.proyecto._id, $("#limite").val()).subscribe(response => {
        this.proyecto.planificacion = response;
        this.tamanioListaTareas = response.length;
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

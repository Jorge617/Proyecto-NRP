import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpParams } from '@angular/common/http';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { RequisitoService } from 'src/app/services/requisito.service';
import { Requisito } from 'src/app/models/requisito';



@Component({
  selector: 'app-descripcion-tarea-cliente',
  templateUrl: './descripcion-tarea-cliente.component.html',
  styleUrls: ['./descripcion-tarea-cliente.component.css'],
  providers: [UsuarioService, ProyectoService, RequisitoService]
})
export class DescripcionTareaClienteComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "", [], 0);
  public arrUsuarios: Usuario[];
  public proyecto: Proyecto; //Proyecto actual
  public requisito: Requisito = new Requisito("", "", "", "", "", 0, [], 1, "");
  public arrUsuariosResponsables: any[];
  public arrPesosUsuariosProyecto: any[];
  public pesosUsuarios: Number[];
  public contribucion: any[];
  public idTarea: any;
  public tareasValoradas: boolean;

  constructor(private _usuarioService: UsuarioService, public router: Router, public route: ActivatedRoute, private _proyectoService: ProyectoService, private _requisitoService: RequisitoService) {
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "", [], 0, 0, 0, [], []);
    this.arrUsuarios = [];
    this.arrUsuariosResponsables = [];
    this.arrPesosUsuariosProyecto = [];
    this.pesosUsuarios = [];
    this.contribucion = [];
    this.tareasValoradas = false;
  }

  ngOnInit(): void {

    this.getUserLogged();

    this.route.params.subscribe(params => {
      this.idTarea = params.idTarea;
      this.getProyecto(params.id);
      this.getRequisito(params.idTarea);

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

  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe(

      response => {
        this.arrUsuarios = response.usuarios;
      },
      error => {
        console.log(<any>error);
      }
    );
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
        this.proyecto.esfuerzoMax = response.esfuerzoMax;
        this.proyecto.satisfaccionMax = response.satisfaccionMax;
        this.calcularContribucionRequisito(this.proyecto._id, this.idTarea, this.proyecto.satisfaccionMax);
        this.comprobarRequisitosPriorizados(this.proyecto._id);
      },
      error => {
        console.log(<any>error);
      }

    );

  }

  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

  }

  getRequisito(id: any) {
    this._requisitoService.getRequisito(id).subscribe(response => {
      this.requisito._id = response._id;
      this.requisito.nombre = response.nombre;
      this.requisito.prioridad = response.prioridad;
      this.requisito.coste = response.coste;
      this.requisito.descripcion = response.descripcion;
      this.requisito.fechaInicio = this.formatearFecha(response.fechaInicio);
      this.requisito.fechaFin = this.formatearFecha(response.fechaFin);

      for (var i = 0; i < this.requisito.prioridad.length; i++) {

        this._usuarioService.getUsuario(this.requisito.prioridad[i].usuario).subscribe(response => {
          this.arrUsuariosResponsables.push(response);
        }, error => {
          console.log(<any>error);
        });
      }

      this.getPesosUsuarios();


    }, error => {
      console.log(<any>error);
    });
  }

  getPesosUsuarios() {
    for (var j = 0; j < this.requisito.prioridad.length; j++) {
      this._proyectoService.getPesoUsuario(this.proyecto._id, this.requisito.prioridad[j].usuario).subscribe(response => {
        this.pesosUsuarios.push(response.importancia);
      }, error => {
        console.log(<any>error);
      })
    }
  }

  borrarRequisito() {
    this._requisitoService.borrarRequisito(this.requisito._id, this.proyecto._id).subscribe(response => {
      this.router.navigateByUrl('/proyecto/' + this.proyecto._id);
    })
  }

  calcularContribucionRequisito(idProyecto: any, idRequisito: any, satisfaccionTotal: any) {
    console.log(idRequisito);
    console.log(idProyecto);

    this._proyectoService.calcularContribucionRequisito(idProyecto, idRequisito, satisfaccionTotal).subscribe(response => {
      this.contribucion = response.contribucion;
    });
  }
  comprobarRequisitosPriorizados(idProyecto: any) {
    this._proyectoService.comprobarRequisitosPriorizados(idProyecto).subscribe(response => {

      this.tareasValoradas = response.priorizados;
    })
  }

}

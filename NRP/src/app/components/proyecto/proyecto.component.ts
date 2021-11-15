import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Proyecto } from 'src/app/models/proyecto';
import { DateAdapter } from '@angular/material/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Requisito } from 'src/app/models/requisito';
import { RequisitoService } from '../../services/requisito.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
  providers: [UsuarioService, ProyectoService, RequisitoService]
})
export class ProyectoComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "", []);
  public proyecto: Proyecto; //Proyecto actual
  public arrUsuariosProyecto: Usuario[] | any; //Usuarios que participan en el proyecto
  public arrUsuariosNombre: any[]; //Los nombres de los usuarios que participan en el proyecto
  public arrUsuariosDisponibles: Usuario[]; //Los usuarios que se pueden asignar a un proyecto
  public arrTareasProyecto: Requisito[];

  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, private dateAdapter: DateAdapter<Date>,
    public route: ActivatedRoute, private _requisitoService: RequisitoService) {
    this.dateAdapter.setLocale('es-ES');
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "", []);
    this.arrUsuariosNombre = [];
    this.arrUsuariosDisponibles = [];
    this.arrTareasProyecto = [];


  }



  ngOnInit(): void {

    this.getUserLogged();
    $("#ListaClientes").hide();

    this.route.params.subscribe(params => {
      this.getProyecto(params.id);
    });

    this.route.params.subscribe(params => {
      this.getUsuariosDisponibles(params.id);
    });

    this.route.params.subscribe(params => {
      this.getUsuariosInfo(params.id);
    });

    this.route.params.subscribe(params => {
      this.getRequisitos(params.id);
    });

  }

  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

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


  mostrarListaClientes() {
    $("#ListaClientes").fadeIn();


  }

  cerrarLista() {
    $("#ListaClientes").hide(500);

  }

  getProyecto(id: any) {
    this._proyectoService.getProyecto(id).subscribe(

      response => {
        this.proyecto._id = response._id;
        this.proyecto.nombre = response.nombre;
        this.proyecto.descripcion = response.descripcion;
        this.proyecto.fechaInicio = this.formatearFecha(response.fechaInicio.toString());
        this.proyecto.fechaFin = this.formatearFecha(response.fechaFin.toString());
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

  getUsuariosInfo(id: any) {
    this._proyectoService.getUsuariosInfo(id).subscribe(response => {
      this.arrUsuariosProyecto = response;
    })


  }



  getUsuariosDisponibles(id: any) {
    this._proyectoService.getUsuariosDisponibles(id).subscribe(
      response => {
        this.arrUsuariosDisponibles = response.resultado;
      }, error => {
        console.log(<any>error);
      });
  }

  deleteUsuarios(indice: any) {

    var deleteUsuario = [];
    deleteUsuario.push(this.arrUsuariosProyecto[indice]);
    this._proyectoService.deleteUsuarios(this.proyecto._id, deleteUsuario).subscribe(response => {
      this.route.params.subscribe(params => {
        this.getUsuariosInfo(params.id);
        this.getUsuariosDisponibles(params.id);
      });
    });


  }


  deleteProyecto() {
    this._proyectoService.deleteProyecto(this.proyecto).subscribe();
    this.router.navigateByUrl("/inicio/" + this.usuario._id);
  }

  getRequisitos(idProyecto: any) {
    this._proyectoService.getRequisitos(idProyecto).subscribe(
      response => {
        this.arrTareasProyecto = response.requisitos;
      }, error => {
        console.log(<any>error);
      });
  }

  borrarRequisito(indice: any) {
    this._requisitoService.borrarRequisito(this.arrTareasProyecto[indice]._id, this.proyecto._id).subscribe(response => {
      this.route.params.subscribe(params => {
        this.getRequisitos(params.id);
      });
    })
  }


}

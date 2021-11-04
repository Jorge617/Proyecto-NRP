import { Component, DoCheck, NgZone, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Proyecto } from 'src/app/models/proyecto';
import { DateAdapter } from '@angular/material/core';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
  providers: [UsuarioService, ProyectoService]
})
export class ProyectoComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], []);
  public proyecto: Proyecto; //Proyecto actual
  public arrUsuariosProyecto: Usuario[] | any; //Usuarios que participan en el proyecto
  public arrUsuariosNombre: any[]; //Los nombres de los usuarios que participan en el proyecto
  public arrUsuariosDisponibles: Usuario[]; //Los usuarios que se pueden asignar a un proyecto


  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, private dateAdapter: DateAdapter<Date>,
    public route: ActivatedRoute) {
    this.dateAdapter.setLocale('es-ES');
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "");
    this.arrUsuariosNombre = [];
    this.arrUsuariosDisponibles = [];

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


  }

  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

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
        this.proyecto.fechaInicio = response.fechaInicio;
        this.proyecto.fechaFin = response.fechaFin;
        this.proyecto.usuarios = response.usuarios;
        this.proyecto.requisitos = response.requisitos;
        this.proyecto.idUsuario = this.usuario._id;
        //Usuarios del proyecto
        this.arrUsuariosProyecto = response.usuarios;
        //this.getUsuariosParticipantes();
      },
      error => {
        console.log(<any>error);
      }

    );

  }

  getUsuariosParticipantes() {
    for (var i = 0; i < this.arrUsuariosProyecto.length; i++) {

      this._usuarioService.getUsuario(this.arrUsuariosProyecto[i].usuario).subscribe(

        response => {

          this.arrUsuariosNombre.push(response.nombre);
          console.log(response.nombre);
        },
        error => {
          console.log(<any>error);
        }
      );
    }
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

    this._proyectoService.deleteUsuarios(this.proyecto._id, deleteUsuario).subscribe();
    window.location.reload();

  }


  deleteProyecto() {
    this._proyectoService.deleteProyecto(this.proyecto).subscribe();
    this.router.navigateByUrl("/inicio/" + this.usuario._id);
  }



}

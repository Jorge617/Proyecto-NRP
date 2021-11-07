import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { Requisito } from 'src/app/models/requisito';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { RequisitoService } from 'src/app/services/requisito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
  providers: [UsuarioService, ProyectoService, RequisitoService]
})
export class CrearTareaComponent implements OnInit {
  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "", []);
  public proyecto: Proyecto;
  public arrUsuarios: Usuario[];
  public arrUsuariosAdd: Usuario[];
  public arrUsuariosProyecto: Usuario[] | any; //Usuarios que participan en el proyecto
  public requisito: Requisito = new Requisito("", "", "", "", "", [], 1, "");

  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, private dateAdapter: DateAdapter<Date>,
    public route: ActivatedRoute, private _requisitoService: RequisitoService) {
    this.dateAdapter.setLocale('es-ES');
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "");
    this.arrUsuarios = [];
    this.arrUsuariosAdd = [];

  }

  ngOnInit(): void {
    this.getUserLogged();
    $(".ListaClientes").hide();
    $(".ListaAñadido").hide();
    $("#botonResetear").hide();
    this.getUsuarios();

    this.route.params.subscribe(params => {
      this.getProyecto(params.id);
    });

    this.route.params.subscribe(params => {
      this.getUsuariosInfo(params.id);
    });
  }

  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

  }

  cerrarSesion() {
    this._usuarioService.deleteTokenCookies();
    this.router.navigateByUrl("/login");
  }

  mostrarListaClientes() {
    $(".ListaClientes").fadeIn();
  }

  cerrarLista() {
    $(".ListaClientes").hide(1000);


  }

  addUsuario(indice: number) {
    this.arrUsuariosAdd.push(this.arrUsuariosProyecto[indice]);
    this.removeItemFromArr(this.arrUsuariosProyecto, this.arrUsuariosProyecto[indice]);
    $("#botonResetear").fadeIn(500);

  }

  deleteUsuario() {
    this.arrUsuariosAdd = [];
    this.route.params.subscribe(params => {
      this.getUsuariosInfo(params.id);
    });

  }

  removeItemFromArr(arr: any, item: any) {
    var i = arr.indexOf(item);

    if (i !== -1) {
      arr.splice(i, 1);
    }
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

      },
      error => {
        console.log(<any>error);
      }
    );
  }

  crearRequisito() {
    for (var i = 0; i < this.arrUsuariosAdd.length; i++) {
      this.requisito.prioridad.push({ "usuario": this.arrUsuariosAdd[i], "valor": 0 });
    }
    this.requisito.idProyecto = this.proyecto._id;
    this.proyecto.requisitos.push(this.requisito);
    this._requisitoService.crearRequisito(this.requisito).subscribe(response => {
      this.router.navigateByUrl("proyecto/" + this.proyecto._id);
    });


  }

  getUsuariosInfo(id: any) {
    this._proyectoService.getUsuariosInfo(id).subscribe(response => {
      this.arrUsuariosProyecto = response;
    })


  }



}



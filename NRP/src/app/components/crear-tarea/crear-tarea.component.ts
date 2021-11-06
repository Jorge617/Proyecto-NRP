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
  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], []);
  public proyecto: Proyecto;
  public arrUsuarios: Usuario[];
  public arrUsuariosAdd: Usuario[];
  public requisito: Requisito;

  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, private dateAdapter: DateAdapter<Date>,
    public route: ActivatedRoute, private _requisitoService: RequisitoService) {
    this.dateAdapter.setLocale('es-ES');
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "");
    this.arrUsuarios = [];
    this.arrUsuariosAdd = [];
    this.requisito = new Requisito("", "", "", "", "", [], 0, "");
  }

  ngOnInit(): void {
    this.getUserLogged();
    $(".ListaClientes").hide();
    $(".ListaAñadido").hide();
    this.getUsuarios();

    this.route.params.subscribe(params => {
      this.getProyecto(params.id);
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
    $(".ListaAñadido").hide(1000);


  }

  addUsuario(indice: number) {
    this.arrUsuariosAdd.push(this.arrUsuarios[indice]);
    $(".ListaAñadido").fadeIn();
    $(".ListaClientes").hide(500);

  }

  deleteUsuario(indice: number) {
    this.removeItemFromArr(this.arrUsuariosAdd, this.arrUsuariosAdd[indice]);
    $(".ListaClientes").fadeIn(500);
    $(".ListaAñadido").hide();
    console.log("Usuario eliminado");
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
    this.requisito.prioridad.push({ "usuario": this.arrUsuariosAdd[0], "valor": 0 });
    this.requisito.idProyecto = this.proyecto._id;
    this.proyecto.requisitos.push(this.requisito);
    this._requisitoService.crearRequisito(this.requisito).subscribe();
    this.router.navigateByUrl("proyecto/" + this.proyecto._id);

  }

}

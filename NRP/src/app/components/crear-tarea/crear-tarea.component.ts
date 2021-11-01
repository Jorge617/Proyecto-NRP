import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
  providers: [UsuarioService, ProyectoService]
})
export class CrearTareaComponent implements OnInit {
  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], []);
  public proyecto: Proyecto;
  public arrUsuarios: Usuario[];
  public arrUsuariosAdd: Usuario[];

  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, private dateAdapter: DateAdapter<Date>,
    public route: ActivatedRoute) {
    this.dateAdapter.setLocale('es-ES');
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "");
    this.arrUsuarios = [];
    this.arrUsuariosAdd = [];
  }

  ngOnInit(): void {
    this.getUserLogged();
    $(".ListaClientes").hide();
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
    $(".ListaClientes").hide(500);

  }

  addUsuario(indice: number) {
    this.arrUsuariosAdd.push(this.arrUsuarios[indice]);

  }

  deleteUsuario(indice: number) {
    this.removeItemFromArr(this.arrUsuariosAdd, this.arrUsuariosAdd[indice]);
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
        this.proyecto.idUsuario = this.usuario.id;

      },
      error => {
        console.log(<any>error);
      }
    );
  }
}

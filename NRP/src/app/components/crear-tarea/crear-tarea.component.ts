import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
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
  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "");
  public proyecto: Proyecto;
  public arrUsuarios: Usuario[] | undefined;
  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('es-ES');
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "");
  }

  ngOnInit(): void {
    this.getUserLogged();
    $("#ListaClientes").hide();
    this.getUsuarios()
  }
  
  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

  }

  cerrarSesion() {
    this._usuarioService.deleteTokenCookies();
    this.router.navigateByUrl("/login");
  }

  mostrarListaClientes() {
    $("#ListaClientes").fadeIn();


  }

  cerrarLista() {
    $("#ListaClientes").hide(500);

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
}

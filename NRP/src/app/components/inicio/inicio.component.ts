import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/models/proyecto';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [UsuarioService, ProyectoService]

})
export class InicioComponent implements OnInit, OnDestroy {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], []);

  public arrProyectosCreados: Proyecto[];
  public arrProyectosParticipo: Proyecto[];

  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, public route: ActivatedRoute) {

    this.arrProyectosCreados = [];
    this.arrProyectosParticipo = [];
  }

  ngOnInit(): void {
    this.getUserLogged();
    this.route.params.subscribe(params => {
      this.getProyectos(params.id);
    });

  }

  ngOnDestroy() {
    this.arrProyectosCreados = []
  }


  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

  }

  cerrarSesion() {
    this._usuarioService.deleteTokenCookies();
    this.router.navigateByUrl("/login");
  }

  getProyectos(id: string) {
    this._usuarioService.getProyectos(id).subscribe(

      response => {
        this.arrProyectosCreados = response.proyectos;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}

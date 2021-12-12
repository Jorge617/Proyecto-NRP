import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/models/proyecto';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [UsuarioService, ProyectoService]

})
export class InicioComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "", [], 0);

  public arrProyectosCreados: Proyecto[];
  public arrProyectosParticipo: Proyecto[];
  public arrProyectosParticipoNombre: Proyecto[];

  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, public route: ActivatedRoute) {

    this.arrProyectosCreados = [];
    this.arrProyectosParticipo = [];
    this.arrProyectosParticipoNombre = [];
  }

  ngOnInit(): void {
    this.getUserLogged();
    this.route.params.subscribe(params => {
      this.getProyectos(params.id);
    });
    this.route.params.subscribe(params => {
      this.getProyectosParticipo(params.id)
    });
  }

  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

  }

  cerrarSesion() {
    this._usuarioService.deleteTokenCookies();
    this.router.navigateByUrl("/login");
  }

  filtroProyectos() {
    return this.arrProyectosCreados.filter(x => x != null);
  }

  proyectosNull(): boolean {
    var resultado = 0;
    var sonNulos = false;
    for (var i = 0; i < this.arrProyectosCreados.length; i++) {
      if (this.arrProyectosCreados[i] == null) {
        resultado++;
      }
    }
    if (resultado == this.arrProyectosCreados.length) {
      sonNulos = true;
    }

    return sonNulos;
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
  getProyectosParticipo(id: any) {
    this._usuarioService.getUsuario(id).subscribe(response => {
      this.arrProyectosParticipo = response.proyectos;
      for (var i = 0; i < this.arrProyectosParticipo.length; i++) {
        this._proyectoService.getProyecto(this.arrProyectosParticipo[i]).subscribe(response => {
          this.arrProyectosParticipoNombre.push(response);
        });

      }
    }, error => {
      console.log(<any>error);
    })
  }
}

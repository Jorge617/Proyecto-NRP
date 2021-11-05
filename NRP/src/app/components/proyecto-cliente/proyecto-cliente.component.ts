import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-proyecto-cliente',
  templateUrl: './proyecto-cliente.component.html',
  styleUrls: ['./proyecto-cliente.component.css'],
  providers: [UsuarioService, ProyectoService]
})
export class ProyectoClienteComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], []);
  public proyecto: Proyecto; //Proyecto actual
  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, public route: ActivatedRoute) {
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "");
  }

  ngOnInit(): void {
    this.getUserLogged();
    this.route.params.subscribe(params => {
      this.getProyecto(params.id);
    });
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
      },
      error => {
        console.log(<any>error);
      }

    );

  }

}



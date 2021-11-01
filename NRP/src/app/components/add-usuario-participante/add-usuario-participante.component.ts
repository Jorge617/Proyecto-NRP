import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { DateAdapter } from '@angular/material/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-usuario-participante',
  templateUrl: './add-usuario-participante.component.html',
  styleUrls: ['./add-usuario-participante.component.css'],
  providers: [UsuarioService, ProyectoService]
})
export class AddUsuarioParticipanteComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], []);
  public proyecto: Proyecto;
  public arrUsuarios: Usuario[] | undefined;

  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, private dateAdapter: DateAdapter<Date>,
    public route: ActivatedRoute) {
    this.dateAdapter.setLocale('es-ES');
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "");
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.getProyecto(params.id);

    });

    this.route.params.subscribe(params => {
      this.getUsuario(params.idUsuario);
    });
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
  getUsuario(id: any) {
    this._usuarioService.getUsuario(id).subscribe(
      response => {
        this.usuario._id = response._id;
        this.usuario.nombre = response.nombre
        this.usuario.password = response.password;
        this.usuario.token = response.token;
        this.usuario.importancia = response.importancia;
        this.usuario.esCliente = response.esCliente;
        this.usuario.proyectos = response.proyectos;
        this.usuario.propietario = response.propietario
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}

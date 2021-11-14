import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpParams } from '@angular/common/http';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { RequisitoService } from 'src/app/services/requisito.service';
import { Requisito } from 'src/app/models/requisito';



@Component({
  selector: 'app-descripcion-tarea-cliente',
  templateUrl: './descripcion-tarea-cliente.component.html',
  styleUrls: ['./descripcion-tarea-cliente.component.css'],
  providers: [UsuarioService, ProyectoService, RequisitoService]
})
export class DescripcionTareaClienteComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "", []);
  public arrUsuarios: Usuario[];
  public proyecto: Proyecto; //Proyecto actual
  public requisito: Requisito = new Requisito("", "", "", "", "", 0, [], 1, "");
  public arrUsuariosResponsables: any[];
  public arrPesosUsuariosProyecto: any[];

  constructor(private _usuarioService: UsuarioService, public router: Router, public route: ActivatedRoute, private _proyectoService: ProyectoService, private _requisitoService: RequisitoService) {
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "", []);
    this.arrUsuarios = [];
    this.arrUsuariosResponsables = [];
    this.arrPesosUsuariosProyecto = [];
  }

  ngOnInit(): void {

    this.getUserLogged();

    this.route.params.subscribe(params => {
      this.getProyecto(params.id);
      this.getRequisito(params.idTarea);
    });


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

  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

  }

  getRequisito(id: any) {
    this._requisitoService.getRequisito(id).subscribe(response => {
      this.requisito._id = response._id;
      this.requisito.nombre = response.nombre;
      this.requisito.prioridad = response.prioridad;
      this.requisito.coste = response.coste;
      this.requisito.descripcion = response.descripcion;
      this.requisito.fechaInicio = response.fechaInicio;
      this.requisito.fechaFin = response.fechaFin;

      for (var i = 0; i < this.requisito.prioridad.length; i++) {

        this._usuarioService.getUsuario(this.requisito.prioridad[i].usuario).subscribe(response => {
          this.arrUsuariosResponsables.push(response);
        }, error => {
          console.log(<any>error);
        });
      }


    }, error => {
      console.log(<any>error);
    });
  }

  borrarRequisito() {
    this._requisitoService.borrarRequisito(this.requisito._id, this.proyecto._id).subscribe(response => {
      this.router.navigateByUrl('/proyecto/' + this.proyecto._id);
    })
  }


}

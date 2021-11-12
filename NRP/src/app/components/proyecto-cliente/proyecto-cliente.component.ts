import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { Requisito } from 'src/app/models/requisito';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { RequisitoService } from 'src/app/services/requisito.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-proyecto-cliente',
  templateUrl: './proyecto-cliente.component.html',
  styleUrls: ['./proyecto-cliente.component.css'],
  providers: [UsuarioService, ProyectoService, RequisitoService]
})
export class ProyectoClienteComponent implements OnInit {


  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "", []);
  public proyecto: Proyecto; //Proyecto actual
  public arrTareasProyecto: Requisito[];
  public requisito: Requisito = new Requisito("", "", "", "", "", 0, [], 1, "");
  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, public route: ActivatedRoute,
    private _requistoService: RequisitoService) {
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "", []);
    this.arrTareasProyecto = [];
  }

  ngOnInit(): void {
    this.getUserLogged();
    this.route.params.subscribe(params => {
      this.getProyecto(params.id);
    });

    this.route.params.subscribe(params => {
      this.usuario.idProyecto = params.id;
      this.getRequisitosProyecto(params.idUsuario);
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

  getRequisitosProyecto(idUsuario: any) {
    this._usuarioService.getRequisitosProyecto(this.usuario, idUsuario).subscribe(response => {
      this.arrTareasProyecto = response;
    }, error => {
      console.log(<any>error);
    });
  }

}



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { Requisito } from 'src/app/models/requisito';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { RequisitoService } from 'src/app/services/requisito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-valor-tarea',
  templateUrl: './add-valor-tarea.component.html',
  styleUrls: ['./add-valor-tarea.component.css'],
  providers: [UsuarioService, ProyectoService, RequisitoService]
})
export class AddValorTareaComponent implements OnInit {
  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "", []);
  public requisito: Requisito = new Requisito("", "", "", "", "", 1, [], 1, "");
  public proyecto: Proyecto; //Proyecto actual
  public importanciaTarea: Number;
  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, public route: ActivatedRoute,
    private _requistoService: RequisitoService) {
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "", [], 0, 0);
    this.importanciaTarea = 1;
  }

  ngOnInit(): void {
    this.getUserLogged();
    this.route.params.subscribe(params => {
      this.getProyecto(params.idProyecto);
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
  updateImportancia() {
    this.importanciaTarea = this.requisito.importancia;
    if (this.importanciaTarea > 0 && this.importanciaTarea <= 5) {
      this.route.params.subscribe(params => {
        this._requistoService.updateImportancia(params.id, this.usuario._id, this.requisito.importancia).subscribe(response => {
          this.router.navigateByUrl("proyecto-cliente/" + this.proyecto._id + "/" + this.usuario._id);
        });
      })
    }
  }
}


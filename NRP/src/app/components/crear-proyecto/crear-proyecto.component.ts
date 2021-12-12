import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { DateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css'],
  providers: [UsuarioService, ProyectoService]
})
export class CrearProyectoComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], "", [], 0);
  public proyecto: Proyecto;

  constructor(private _usuarioService: UsuarioService, private _proyectoService: ProyectoService, public router: Router, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('es-ES');
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "", [], 0, 0, 0, [], []);
  }

  ngOnInit(): void {
    this.getUserLogged();
  }

  getUserLogged() {
    this._usuarioService.getUserLogged(this.usuario);

  }

  cerrarSesion() {
    this._usuarioService.deleteTokenCookies();
    this.router.navigateByUrl("/login");
  }

  crearProyecto() {
    this.proyecto.idUsuario = this.usuario._id;
    this._proyectoService.crearProyecto(this.proyecto).subscribe(response => {
      this.router.navigateByUrl('/inicio/' + this.usuario._id);
    });
  }

}

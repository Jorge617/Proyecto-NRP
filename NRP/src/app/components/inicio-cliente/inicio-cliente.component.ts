import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.component.html',
  styleUrls: ['./inicio-cliente.component.css'],
  providers: [UsuarioService]
})
export class InicioClienteComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], []);
  constructor(private _usuarioService: UsuarioService, public router: Router) {

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

}

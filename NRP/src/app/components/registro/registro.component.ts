import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers :[UsuarioService]
})
export class RegistroComponent implements OnInit {

  public nombre:string|undefined;
  public password:string|undefined;
  public usuario:Usuario;

  constructor(private _usuarioService:UsuarioService) {
    this.usuario = new Usuario("","");
   }

   
            
  ngOnInit(): void {
  }

  registro(){
    var _nombre = $("#floatingInput").val();
    var _contrasenia = $("#floatingPassword").val();
    var repetir_contrasenia = $("#floatingPassword2").val();

    this.usuario = new Usuario("Jorge","123456");

    this._usuarioService.registro(this.usuario);
  }
 

}


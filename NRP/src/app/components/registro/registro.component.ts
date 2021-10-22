import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers :[UsuarioService]
})
export class RegistroComponent implements OnInit {

  public usuario:Usuario;

  constructor(private _usuarioService:UsuarioService,public router: Router) {
    this.usuario = new Usuario("","","");
   }
       
  ngOnInit(): void {
  }

  registro(form:any){
    
    this._usuarioService.registro(this.usuario).subscribe();
    form.reset();
    this.router.navigateByUrl('/login');
  }
 

}


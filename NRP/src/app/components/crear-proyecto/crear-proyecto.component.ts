import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css'],
  providers: [UsuarioService]
})
export class CrearProyectoComponent implements OnInit {

  public usuario:Usuario = new Usuario("","","","","",0,false);
  
  constructor(private _usuarioService:UsuarioService,public router: Router) { 
    
  }
  
  ngOnInit(): void {
   this.getUserLogged();
  }

  getUserLogged(){
    this._usuarioService.getUserLogged(this.usuario);
   
  }

  cerrarSesion(){
    this._usuarioService.deleteTokenCookies();
    this.router.navigateByUrl("/login");
  }

}
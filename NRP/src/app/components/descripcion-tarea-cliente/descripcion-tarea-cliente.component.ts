import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-descripcion-tarea-cliente',
  templateUrl: './descripcion-tarea-cliente.component.html',
  styleUrls: ['./descripcion-tarea-cliente.component.css'],
  providers: [UsuarioService]
})
export class DescripcionTareaClienteComponent implements OnInit {

  public usuario:Usuario = new Usuario("","","","","",0,false,[],"");
  public arrUsuarios:Usuario[] | undefined;

  constructor(private _usuarioService:UsuarioService,public router: Router) { 
    
  }

  ngOnInit(): void {
    this.getUserLogged();
   this.getUsuarios();
  }

  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe(
      
        response =>{
            this.arrUsuarios = response.usuarios; 
        },
        error =>{
          console.log(<any>error);
        }
    );
  }

  getUserLogged(){
    this._usuarioService.getUserLogged(this.usuario);
   
  }

  cerrarSesion(){
    this._usuarioService.deleteTokenCookies();
    this.router.navigateByUrl("/login");
  }
}

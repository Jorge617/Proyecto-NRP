import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [UsuarioService]

})
export class InicioComponent implements OnInit {

  public usuario:Usuario = new Usuario("","","","","",0,false);
  
  constructor(private _usuarioService:UsuarioService) { 
    
  }
  
  ngOnInit(): void {
   this.getUserLogged();
   console.log(this.getUserLogged());
  }

  getUserLogged(){
    this._usuarioService.getUsuarioByToken(this._usuarioService.getTokenCookies()).subscribe(data =>{
      this.usuario.id = data.usuarioByToken._id;
      this.usuario.nombre =data.usuarioByToken.nombre
      this.usuario.password =data.usuarioByToken.password;
      this.usuario.token =data.usuarioByToken.token;
      this.usuario.importancia =data.usuarioByToken.importancia;
      this.usuario.esCliente = data.usuarioByToken.esCliente;
    }, error => {
      console.log(<any>error);
      })
     
  }

}

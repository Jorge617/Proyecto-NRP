import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  public usuario:Usuario;
  public logueado:boolean;
  public mensaje : string;

  constructor(private _usuarioService:UsuarioService,public router: Router) { 
    this.usuario =  new Usuario("","","","","",0,false);
    this.mensaje = "";
    this.logueado = false;
  }

  ngOnInit(): void {
  }


login(form:any){
  this._usuarioService.login(this.usuario).subscribe(
    
    data => {
      console.log(data);
      if(data.resultado == true){
      this.logueado = true;
      let token = this._usuarioService.token();
      this._usuarioService.setTokenCookies(token.toString());

      this.usuario.id = data.usuario._id;
      this.usuario.nombre = data.usuario.nombre;
      this.usuario.password = data.usuario.password;
      this.usuario.token = token;
      this.usuario.importancia = data.usuario.importancia;
      this.usuario.esCliente = data.usuario.esCliente;
      this._usuarioService.updateUsuario(this.usuario);
        
      

      form.reset();
      this.router.navigateByUrl('/inicio');
      }else{
        this.logueado = false;
        this.mensaje = data.error;
        this.router.navigateByUrl('/');
      }
    },
    error => {
      console.log(<any>error);
    }
  )
}

}

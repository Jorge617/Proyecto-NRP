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
    this.usuario =  new Usuario("","","");
    this.mensaje = "";
    this.logueado = false;
  }

  ngOnInit(): void {
  }

login(form:any){
  this._usuarioService.login(this.usuario).subscribe(
    
    data => {
      if(data.resultado == true){
      this.logueado = true;
      this._usuarioService.setToken(data.token);
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

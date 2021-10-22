import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  public usuario:Usuario;
  public logueado:boolean;

  constructor(private _usuarioService:UsuarioService) { 
    this.usuario =  new Usuario("","","");
    this.logueado = false;
  }

  ngOnInit(): void {
  }

/*login(){
  this._usuarioService.login(this.usuario).subscribe(

    data => {
      console.log(data);
      console.log("Aquí");
    },
    error => {
      console.log(<any>error);
    }
  )
}*/

}

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
  }

  getUserLogged(){
    this._usuarioService.getUserLogged(this.usuario);
   
  }

}

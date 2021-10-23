import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [UsuarioService]

})
export class InicioComponent implements OnInit {

  constructor(private _usuarioService:UsuarioService) { }

  ngOnInit(): void {

  }

  

}

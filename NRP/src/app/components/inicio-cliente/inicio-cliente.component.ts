import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.component.html',
  styleUrls: ['./inicio-cliente.component.css'],
  providers: [UsuarioService, ProyectoService]
})
export class InicioClienteComponent implements OnInit {

  public usuario: Usuario = new Usuario("", "", "", "", "", 0, false, [], []);
  public proyecto: Proyecto; //Proyecto actual
  constructor(private _usuarioService: UsuarioService, public router: Router, private _proyectoService: ProyectoService, public route: ActivatedRoute) {
    this.proyecto = new Proyecto("", "", [], new Date(), new Date(), [], "", "");
  }

  ngOnInit(): void {

  }



}

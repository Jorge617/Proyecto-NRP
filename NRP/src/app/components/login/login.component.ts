import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { 
 
  }

  ngOnInit(): void {
    // this.login("nombre","nombre");
  }
/*
  validateLogin() {
    
    var campoNombre = $("form2Example11");
    var campoPassword = $("form2Example22");
    var botonLogin = $("botonLogin");

    this.nombre = campoNombre.val();
    this.password = campoPassword.val();
    botonLogin.click(function(){
      
    var campoNombre = $("form2Example11");
    var campoPassword = $("form2Example22");
    this.nombre = campoNombre.val()?.toString;
    this.password = campoNombre.val()?.toString;
    botonLogin.(click)="this.http.get("http/localhost/4000/Usuarios")";
    var respond = this.http.get("http/localhost/4000/Usuarios");
    respond.
    
  }*/

}

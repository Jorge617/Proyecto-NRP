import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Usuario } from '../models/usuario';
import { param } from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioMDB } from '../models/usuarioMDB';

@Injectable()
export class UsuarioService {
	public url:string;

	constructor(private _http: HttpClient,private cookies: CookieService){
		this.url = Global.url;
	}

	getUsuario(id:any) : Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'usuarios/'+id, {headers: headers});
	}

	getUsuarios() : Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'usuarios', {headers: headers});
	}

	getUsuarioByToken(token:string) : Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'usuarios/token/'+ token,{headers: headers});
	}


    registro(usuario:Usuario): Observable<any> {
        let params = JSON.stringify(usuario);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'usuarios', params, {headers: headers});
	}

	login(usuario:Usuario): Observable<any> {
       
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(`${this.url}usuarios/login?nombre=${usuario.nombre}&password=${usuario.password}`,{headers:headers});
	}

	updateUsuario(usuario:Usuario): Observable<any> {
		let params = JSON.stringify(usuario);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url+'usuarios/'+usuario.id, params, {headers: headers});
	}

	updateToken(id:any) : Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url+'token/'+id, {headers: headers});
	}

	borrarUsuario(id:any) : Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.delete(this.url+'usuarios/'+id, {headers: headers});
	}

	randomToken() {
		return Math.random().toString(36).substr(2); // Eliminar `0.`
	}
	
	token() {
	  return this.randomToken() + this.randomToken(); // Para hacer el token más largo
	}

	setTokenCookies(token: string) {
		this.cookies.set("token", token);
	  }
	getTokenCookies() {
		return this.cookies.get("token");
	  }

	getUserLogged(usuario:Usuario) {
		const token = this.getTokenCookies();
		// Aquí iría el endpoint para devolver el usuario para un token
		this.getUsuarioByToken(token).subscribe(
			response => {
			 usuario.id = response.usuarioByToken._id;
			 usuario.nombre =response.usuarioByToken.nombre
			 usuario.password =response.usuarioByToken.password;
			 usuario.token =response.usuarioByToken.token;
			 usuario.importancia =response.usuarioByToken.importancia;
			 usuario.esCliente = response.usuarioByToken.esCliente;
			  },
			  error => {
				console.log(<any>error);
			  }
		)
	  }

	

}
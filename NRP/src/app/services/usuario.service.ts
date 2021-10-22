import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Usuario } from '../models/usuario';
import { param } from 'jquery';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UsuarioService {
	public url:string;

	constructor(private _http: HttpClient,private cookies: CookieService){
		this.url = Global.url;
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

	setToken(token: string) {
		this.cookies.set("token", "2");
	  }
	  getToken() {
		return this.cookies.get("token");
	  }

	  getUserLogged() {
		const token = this.getToken();
		// Aquí iría el endpoint para devolver el usuario para un token
	  }

	

}
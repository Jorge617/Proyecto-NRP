import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioService {
	public url:string;

	constructor(private _http: HttpClient){
		this.url = Global.url;
	}

    registro(usuario:Usuario): Observable<any> {
        let params = JSON.stringify(usuario);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'usuarios', params, {headers: headers});
	}

	login(usuario:Usuario): Observable<any> {
        let params = JSON.stringify(usuario);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'usuarios/login', params, {headers: headers});
	}

	

}
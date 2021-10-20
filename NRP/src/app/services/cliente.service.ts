import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Global } from './global';

@Injectable()
export class ProjectService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

    getClientes(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'clientes', {headers: headers});
	}

	getCliente(id:Number): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'clientes/' + id, {headers: headers});
	}

}
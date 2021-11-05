import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Usuario } from '../models/usuario';
import { param } from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Proyecto } from '../models/proyecto';
import { Requisito } from '../models/requisito';



@Injectable()
export class RequisitoService {
    public url: string;

    constructor(private _http: HttpClient, private cookies: CookieService) {
        this.url = Global.url;

    }

    getRequisitos() {

    }

    crearRequisito(requisito: Requisito) {
        let params = JSON.stringify(requisito);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + "requisitos", params, { headers: headers });
    }

    deleteAll() {

    }

    getRequisito() {

    }

    borrarRequisito() {

    }

    updateRequisito() {

    }



}

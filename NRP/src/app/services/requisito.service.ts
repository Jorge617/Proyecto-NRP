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

    getRequisitos(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "requisitos", { headers: headers });
    }

    crearRequisito(requisito: Requisito): Observable<any> {
        let params = JSON.stringify(requisito);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + "requisitos", params, { headers: headers });
    }


    getRequisito(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "requisitos/" + id, { headers: headers });
    }

    borrarRequisito(idRequisito: any, idProyecto: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + "requisitos/" + idRequisito + "?idProyecto=" + idProyecto, { headers: headers });
    }

    updateImportancia(id: any, idUsuario: any, valor: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + "requisitos/" + id + "/prioridad?usuario=" + idUsuario + "&valor=" + valor, { headers: headers });
    }


    calcularPrioridadRequisito(idProyecto:any, idRequisito:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "proyectos/" + idProyecto + "/requisito/prioridad?requisito="+idRequisito, { headers: headers });
    }

}

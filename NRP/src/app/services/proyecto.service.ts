import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Usuario } from '../models/usuario';
import { param } from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Proyecto } from '../models/proyecto';



@Injectable()
export class ProyectoService {
    public url: string;

    constructor(private _http: HttpClient, private cookies: CookieService) {
        this.url = Global.url;

    }

    getProyectos(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'proyectos', { headers: headers });
    }

    getProyecto(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'proyectos/' + id, { headers: headers });
    }

    crearProyecto(proyecto: Proyecto): Observable<any> {
        let params = JSON.stringify(proyecto);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + "proyectos", params, { headers: headers });
    }

    deleteProyecto(proyecto: Proyecto): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + "proyectos/" + proyecto._id, { headers: headers });
    }

    postUsuarios(idProyecto: string, usuarios: any[]): Observable<any> {
        let params = JSON.stringify({ usuarios });
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + "proyectos/" + idProyecto + "/usuarios", params, { headers: headers });
    }

    getUsuarios(idProyecto: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "proyectos/" + idProyecto + "/usuarios", { headers: headers });
    }

    getUsuariosDisponibles(idProyecto: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "proyectos/" + idProyecto + "/usuarios-disponibles", { headers: headers });
    }
}


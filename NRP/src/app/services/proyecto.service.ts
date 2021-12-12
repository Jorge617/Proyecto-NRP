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

    updateProyecto(proyecto: Proyecto) {
        let params = JSON.stringify(proyecto);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + "proyectos/" + proyecto._id, params, { headers: headers });
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

    getUsuariosInfo(idProyecto: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "proyectos/" + idProyecto + "/usuarios", { headers: headers });
    }

    getUsuariosDisponibles(idProyecto: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "proyectos/" + idProyecto + "/usuarios-disponibles", { headers: headers });
    }

    deleteUsuarios(idProyecto: string, usuarios: any[]): Observable<any> {
        let body = JSON.stringify({ usuarios });
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        const options = {
            headers: headers,
            body: body

        };
        return this._http.delete(this.url + "proyectos/" + idProyecto + "/usuarios", options);

    }

    getRequisitos(idProyecto: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "proyectos/" + idProyecto + "/requisitos", { headers: headers });
    }

    calcularPrioridad(idProyecto: any, limite: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "proyectos/" + idProyecto + "/prioridad?limite=" + limite, { headers: headers });
    }

    getPesoUsuario(idProyecto: any, idUsuario: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "proyectos/" + idProyecto + "/importancia?idUsuario=" + idUsuario, { headers: headers });
    }


    updatePrioridad(idProyecto: any, planificacion: any[]) {

        let body = JSON.stringify({ "planificacion": planificacion });
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        const options = {
            headers: headers,
            body: body

        };
        return this._http.put(this.url + "proyectos/" + idProyecto + "/prioridad", options);

    }

    calcularMetricas() {

    }
}


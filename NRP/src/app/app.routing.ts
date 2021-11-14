import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule, Route } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from "./components/inicio/inicio.component";
import { RequisitoComponent } from './components/requisito/requisito.component';
import { DescripcionTareaClienteComponent } from './components/descripcion-tarea-cliente/descripcion-tarea-cliente.component';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { ProyectoClienteComponent } from './components/proyecto-cliente/proyecto-cliente.component';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';
import { AddUsuarioParticipanteComponent } from './components/add-usuario-participante/add-usuario-participante.component';
import { InicioClienteComponent } from './components/inicio-cliente/inicio-cliente.component';
import { GestionarTareaComponent } from './components/gestionar-tarea/gestionar-tarea.component';
import { AddValorTareaComponent } from './components/add-valor-tarea/add-valor-tarea.component';
import { EditarProyectoComponent } from './components/editar-proyecto/editar-proyecto.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'inicio/:id', component: InicioComponent },
    { path: 'requisito', component: RequisitoComponent },
    { path: 'requisito/:id', component: RequisitoComponent },
    { path: 'crear-proyecto', component: CrearProyectoComponent },
    { path: 'crear-proyecto/:id', component: CrearProyectoComponent },
    { path: 'proyecto', component: ProyectoComponent },
    { path: 'proyecto/:id', component: ProyectoComponent },
    { path: 'descripcion-tarea-cliente', component: DescripcionTareaClienteComponent },
    { path: 'descripcion-tarea-cliente/:id', component: DescripcionTareaClienteComponent },
    { path: 'descripcion-tarea-cliente/:id/:idTarea', component: DescripcionTareaClienteComponent },
    { path: 'inicio-cliente', component: InicioClienteComponent },
    { path: 'proyecto-cliente', component: ProyectoClienteComponent },
    { path: 'proyecto-cliente/:id/:idUsuario', component: ProyectoClienteComponent },
    { path: 'crear-tarea', component: CrearTareaComponent },
    { path: 'crear-tarea/:id', component: CrearTareaComponent },
    { path: 'add-usuario-participante/:id/:idUsuario', component: AddUsuarioParticipanteComponent },
    { path: 'gestionar-tarea', component: GestionarTareaComponent },
    { path: 'gestionar-tarea/:id', component: GestionarTareaComponent },
    { path: 'add-valor-tarea', component: AddValorTareaComponent },
    { path: 'add-valor-tarea/:id/:idProyecto', component: AddValorTareaComponent },
    { path: 'editar-proyecto/:id', component: EditarProyectoComponent },
    { path: '**', component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
import { ModuleWithProviders, Component } from '@angular/core';
import { Routes,RouterModule, Route } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from "./components/inicio/inicio.component";
import { RequisitoComponent } from './components/requisito/requisito.component';
import { DescripcionTareaClienteComponent } from './components/descripcion-tarea-cliente/descripcion-tarea-cliente.component';
import { InicioJefeProyectoComponent } from './components/inicio-jefe-proyecto/inicio-jefe-proyecto.component';
import { CrearProyectoJefeProyectoComponent } from './components/crear-proyecto-jefe-proyecto/crear-proyecto-jefe-proyecto.component';
import { ProyectoJefeProyectoComponent } from './components/proyecto-jefe-proyecto/proyecto-jefe-proyecto.component';
import { CrearTareaJefeProyectoComponent } from './components/crear-tarea-jefe-proyecto/crear-tarea-jefe-proyecto.component';

const appRoutes : Routes = [
    {path : '', component : LoginComponent},
    {path : 'registro', component : RegistroComponent},
    {path : 'login', component : LoginComponent},
    {path : 'inicio', component : InicioComponent},
    {path : 'inicio/:id', component : InicioComponent},
    {path: 'requisito', component: RequisitoComponent},
    {path: 'descripcion-tarea-cliente', component: DescripcionTareaClienteComponent},
    {path: 'inicio-jefe-proyecto',component: InicioJefeProyectoComponent},
    {path: 'crearProyecto-jefe-proyecto',component:CrearProyectoJefeProyectoComponent},
    {path: 'proyecto-jefe-proyecto',component:ProyectoJefeProyectoComponent},
    {path: 'crearTarea-jefe-proyecto', component:CrearTareaJefeProyectoComponent},
    {path : '**', component : LoginComponent}
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
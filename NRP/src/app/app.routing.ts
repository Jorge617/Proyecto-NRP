import { ModuleWithProviders, Component } from '@angular/core';
import { Routes,RouterModule, Route } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from "./components/inicio/inicio.component";
import { RequisitoComponent } from './components/requisito/requisito.component';
import { DescripcionTareaClienteComponent } from './components/descripcion-tarea-cliente/descripcion-tarea-cliente.component';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';

const appRoutes : Routes = [
    {path : '', component : LoginComponent},
    {path : 'registro', component : RegistroComponent},
    {path : 'login', component : LoginComponent},
    {path : 'inicio', component : InicioComponent},
    {path : 'inicio/:id', component : InicioComponent},
    {path: 'requisito', component: RequisitoComponent},
    {path: 'descripcion-tarea-cliente', component: DescripcionTareaClienteComponent},
    {path : '**', component : LoginComponent}
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
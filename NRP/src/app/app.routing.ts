import { ModuleWithProviders, Component } from '@angular/core';
import { Routes,RouterModule, Route } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from "./components/inicio/inicio.component";


const appRoutes : Routes = [
    {path : '', component : LoginComponent},
    {path : 'registro', component : RegistroComponent},
    {path : 'inicio', component : InicioComponent},
    {path : '**', component : LoginComponent}
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
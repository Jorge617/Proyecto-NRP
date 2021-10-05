import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule, Route } from "@angular/router";


import { InicioComponent } from "./components/inicio/inicio.component";
import { ClientesComponent } from "./components/clientes/clientes.component";
import { TareasComponent } from "./components/tareas/tareas.component";

const appRoutes : Routes = [
    {path : '', component : InicioComponent},
    {path : 'clientes', component : ClientesComponent},
    {path : 'tareas', component : TareasComponent},
    {path : '**', component : InicioComponent}
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
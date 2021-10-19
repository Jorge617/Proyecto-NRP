import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule, Route } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";



const appRoutes : Routes = [
    {path : '', component : LoginComponent},
    {path : '**', component : LoginComponent}
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
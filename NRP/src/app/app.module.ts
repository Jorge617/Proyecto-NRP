import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { routing,appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { TareasComponent } from './components/tareas/tareas.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ClientesComponent,
    TareasComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

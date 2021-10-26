import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { routing,appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RequisitoComponent } from './components/requisito/requisito.component';
import { DescripcionTareaClienteComponent } from './components/descripcion-tarea-cliente/descripcion-tarea-cliente.component';

import { InicioJefeProyectoComponent } from './components/inicio-jefe-proyecto/inicio-jefe-proyecto.component';
import { CrearProyectoJefeProyectoComponent } from './components/crear-proyecto-jefe-proyecto/crear-proyecto-jefe-proyecto.component';
import { ProyectoJefeProyectoComponent } from './components/proyecto-jefe-proyecto/proyecto-jefe-proyecto.component';
import { CrearTareaJefeProyectoComponent } from './components/crear-tarea-jefe-proyecto/crear-tarea-jefe-proyecto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    InicioComponent,
    RequisitoComponent,
    DescripcionTareaClienteComponent,
    InicioJefeProyectoComponent,
    CrearProyectoJefeProyectoComponent,
    ProyectoJefeProyectoComponent,
    CrearTareaJefeProyectoComponent,

  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
    
  ],
  providers: [appRoutingProviders,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RequisitoComponent } from './components/requisito/requisito.component';
import { DescripcionTareaClienteComponent } from './components/descripcion-tarea-cliente/descripcion-tarea-cliente.component';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioClienteComponent } from './components/inicio-cliente/inicio-cliente.component';
import { ProyectoClienteComponent } from './components/proyecto-cliente/proyecto-cliente.component';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';
import { AddUsuarioParticipanteComponent } from './components/add-usuario-participante/add-usuario-participante.component';
import { GestionarTareaComponent } from './components/gestionar-tarea/gestionar-tarea.component';
import { AddValorTareaComponent } from './components/add-valor-tarea/add-valor-tarea.component';
import { EditarProyectoComponent } from './components/editar-proyecto/editar-proyecto.component';
import { EditarTareaComponent } from './components/editar-tarea/editar-tarea.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    InicioComponent,
    RequisitoComponent,
    DescripcionTareaClienteComponent,
    CrearProyectoComponent,
    ProyectoComponent,
    MenuComponent,
    InicioClienteComponent,
    ProyectoClienteComponent,
    CrearTareaComponent,
    AddUsuarioParticipanteComponent,
    GestionarTareaComponent,
    AddValorTareaComponent,
    EditarProyectoComponent,
    EditarTareaComponent
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
  providers: [appRoutingProviders, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

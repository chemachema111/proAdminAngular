import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Rutas
import { APP_ROUTES } from './app-routing.module';

//Modulos
// import { PagesModule } from './pages/pages.module'; * Carga dinámica desde routes con lazyLoad
import { PipesModule } from './pipes/pipes.module';

//Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Servicios
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages/pages.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule, * Carga dinámica desde routes con lazyLoad
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    PipesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

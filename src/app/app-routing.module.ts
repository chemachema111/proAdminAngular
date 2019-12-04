import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';

import { PagesComponent } from './pages/pages.component';


import { LoginGuardGuard } from './services/guards/login-guard.guard';

/*import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/



const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  // Lazyload
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    
    // loadChildren: './ruta/archivoDeModulo#nombreDeModulo'
    loadChildren: './pages/pages.module#PagesModule'
  },
  {path: '**', component: NoPageFoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});

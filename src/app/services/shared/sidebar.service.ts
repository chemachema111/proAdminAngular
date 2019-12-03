import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = []; 
  // Pasado al backend
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Dashboard', url: '/dashboard'},
  //       {titulo: 'Barras de progreso', url: '/progress'},
  //       {titulo: 'Graficas', url: '/graficas'},
  //       {titulo: 'Promesas', url: '/promesas'},
  //       {titulo: 'Rxjs', url: '/rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: '/usuarios'},
  //       {titulo: 'Medicos', url: '/medicos'},
  //       {titulo: 'Hospitales', url: '/hospitales'}
  //     ]
  //   }
  // ];

  constructor( private _usuarioService: UsuarioService ) {
  }

  cargarMenu(){
    this.menu = this._usuarioService.menu;
  }
}

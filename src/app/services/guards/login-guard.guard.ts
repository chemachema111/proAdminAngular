import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( private _usuarioService: UsuarioService,
              private router: Router ){}
  canActivate(){
    if( this._usuarioService.isLogged() ){
      return true;
    } else {
      console.log('bloqueado por loginGuard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}

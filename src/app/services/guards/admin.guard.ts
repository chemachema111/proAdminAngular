import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor( private _usuarioService: UsuarioService ){}
  
  canActivate() {
    console.log(this._usuarioService.usuario);

    if( this._usuarioService.usuario.role === 'ADMIN_ROL'){
      return true;
    } else {
      console.log('Bloqueado por admin');
      this._usuarioService.logout();
      return false;
    }

  }
}

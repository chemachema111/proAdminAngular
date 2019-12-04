import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor( private _usuarioService: UsuarioService,
               private router: Router ){}
  canActivate(): Promise<boolean> | boolean {

    console.log('Token guard iniciado');

    const token = this._usuarioService.token;

    // Recuperar token
    const payload = JSON.parse( atob( token.split('.')[1] ) );
    
    const expirado = this.tokenExpirado( payload.exp );

    if( expirado ){
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenovacion( payload.exp );
  }

  verificaRenovacion( fechaExp: number ): Promise<boolean> {
    return new Promise( (res, rej) => {

      let tokenExp = new Date( fechaExp * 1000 );
      const ahora  = new Date();

      ahora.setTime( ahora.getTime() + ( 1000 * 60 * 60 * .25 ) );

      // console.log(tokenExp);
      // console.log(ahora);

      if ( tokenExp.getTime() > ahora.getTime() ){
        res( true );
      } else {

        this._usuarioService.renuevaToken()
          .subscribe( 
            resp => {
              res( true );
            },
            err => {
              this.router.navigate(['/login']);
              rej(false);
            });

      }

      res( true );

    });
  }

  tokenExpirado( fechaExp: number ){
    const ahora = new Date().getTime() / 1000;

    if( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }
  }

}

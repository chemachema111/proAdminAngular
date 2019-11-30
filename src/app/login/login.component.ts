import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuarios/usuario.service';
import { Usuario } from '../models/usuario.model';

import { map } from 'rxjs/operators';


declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember = false;
  email: string;

  auth2: any;

  constructor( public router: Router,
               public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 0){
      this.remember = true;
    }

  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1012493599126-ucvbco5lvv2msdh9040qu3jp150u77cp.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingIn( document.getElementById('btnGoogle') );

    });
  }

  attachSingIn( element ){

    this.auth2.attachClickHandler( element, {}, ( googleUser ) => {
      // let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle( token )
      .subscribe( 
        resp => window.location.href = '#/dashboard',
        error => console.log(error.error.mensaje)
      );

    });

  }

  ingresar( forma: NgForm ){

    if( forma.invalid ){
      return;
    }

    let usuario = new Usuario( null, null, forma.value.email, forma.value.password );

    this._usuarioService.login( usuario, this.remember )
      .subscribe( 
        resp => window.location.href = '#/dashboard',
        error => console.log(error.error.mensaje)
      );
  }

}

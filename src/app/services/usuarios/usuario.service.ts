import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import swal from 'sweetalert';

// Config
import { URL_SERVICES } from '../../config/config';
import { Router } from '@angular/router';
import { MapOperator } from 'rxjs/internal/operators/map';

// Services
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = URL_SERVICES;
  usuario: Usuario;
  token: string;

  constructor( private http: HttpClient,
               private router: Router,
               private _subirArchivoService: SubirArchivoService) { 
    this.cargarStorage();
  }

  isLogged(){
    return this.token ? true : false;
  }

  cargarStorage(){
    if( localStorage.getItem( 'token' ) ){
      this.token   = localStorage.getItem( 'token' );
      this.usuario = JSON.parse( localStorage.getItem( 'usuario') );
    }
  }

  limpiarStorage(){
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );
    localStorage.removeItem( 'id' );
  }


  guardarStorage( id: string, token: string, user: Usuario){
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( user ) );

    this.usuario = user;
    this.token   = token;
  }

  loginGoogle( token : string ){
    let url = this.url + '/login/google';
    return this.http.post( url, { token }).pipe(
      map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return resp;
      })
    );
  }

  login( usuario: Usuario, remember = false ){

    if( remember ){
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = this.url + '/login';

    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return resp;
      })
    );
  }

  logout(){
    this.usuario = null;
    this.usuario = null;
    this.limpiarStorage();
    this.router.navigate(['/login']);
  }

  crearUsuario( usuario: Usuario ){
    let url = this.url + '/usuario';

    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {

        swal('Éxito', 'Usuario' + usuario.email  + ' creado correctamente', 'success');
        return resp.usuario;

      })
    );

  }

  actualizarUsuario( usuario: Usuario ){
    let url = this.url + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    console.log(url);

    return this.http.put( url, usuario ).pipe(
      map( (resp: any) => {
        swal('Éxito', 'Usuario ' + usuario.nombre  + ' actualizado correctamente', 'success');
        this.guardarStorage( resp.usuario._id, this.token, resp.usuario );
        return resp;
      })
    );
  }

  cambiarImagen( file: File, id: string ){
    this._subirArchivoService.subirArchivo( file, 'usuarios', id )
      .then( (resp: any)=> {
        this.usuario.img = resp.usuario.img;
        swal('Éxito', 'Imagen de ' + resp.usuario.email  + ' actualizada correctamente', 'success');
        this.guardarStorage( resp.usuario._id, this.token, resp.usuario );
      })
      .catch( err => {
        console.log(err);
      });

  }
}

import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';


import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url = URL_SERVICES;
  token: string;
  medico: Medico;

  constructor( private http: HttpClient,
               private router: Router,
               private _subirArchivoService: SubirArchivoService,
               private _usuariosService: UsuarioService) {
    this.token = this._usuariosService.token;
  }
  
  crearMedico( medico: Medico ){
    let url = this.url + '/medico';
    url += '?token=' + this.token;

    return this.http.post( url, medico ).pipe(
      map( (resp: any) => {

        swal('Éxito', 'Medico' + medico.nombre  + ' creado correctamente', 'success');
        return resp.medico;

      })
    );

  }

  actualizarMedico( medico: Medico ){
    let url = this.url + '/medico/' + medico._id;
    url += '?token=' + this.token;

    return this.http.put( url, medico ).pipe(
      map( (resp: any) => {

        swal('Éxito', 'Medico ' + medico.nombre  + ' actualizado correctamente', 'success');

        return resp;
      })
    );
  }

  guardarMedico( medico: Medico ){
    let url = this.url + '/medico';

    if( medico._id ){
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this.token;

      return this.http.put( url, medico ).pipe(
        map( (resp: any) => {

          swal('Éxito', 'Medico' + medico.nombre  + ' actualizado correctamente', 'success');
          return resp.medico;

        })
      );


    } else {
      // Creando

      url += '?token=' + this.token;

      return this.http.post( url, medico ).pipe(
        map( (resp: any) => {

          swal('Éxito', 'Medico' + medico.nombre  + ' creado correctamente', 'success');
          return resp.medico;

        })
      );
    }

  }

  cambiarImagen( file: File, id: string ){
    this._subirArchivoService.subirArchivo( file, 'medicos', id )
      .then( (resp: any)=> {
        this.medico.img = resp.medico.img;
        swal('Éxito', 'Imagen de ' + resp.medico.nombre  + ' actualizada correctamente', 'success');
        this.guardarStorage( resp.medico._id, this.token, resp.medico );
      })
      .catch( err => {
        console.log(err);
      });

  }

  cargarMedicos(desde: number = 0){
    let url = URL_SERVICES + '/medico?desde=' + desde;
    return this.http.get( url );
  }
  

  cargarMedicoPorId(id: string){
    let url = URL_SERVICES + '/medico/' + id + '?token=' + this.token;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.medico )
    );
  }

  buscarMedicos( term: string){
    let url = URL_SERVICES + '/busqueda/coleccion/medicos/' + term;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.medicos)
    );
  }

  borrarMedico( id: string ){
    let url = URL_SERVICES + '/medico/' + id + '?token=' + this.token;
    return this.http.delete( url );
  }
  

  cargarStorage(){
    if( localStorage.getItem( 'token' ) ){
      this.token   = localStorage.getItem( 'token' );
      this.medico = JSON.parse( localStorage.getItem( 'medico') );
    }
  }

  limpiarStorage(){
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'medico' );
    localStorage.removeItem( 'id' );
  }


  guardarStorage( id: string, token: string, hosp: Medico){
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'medico', JSON.stringify( hosp ) );

    this.medico = hosp;
    this.token    = token;
  }

}

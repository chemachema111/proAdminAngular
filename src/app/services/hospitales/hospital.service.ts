import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { URL_SERVICES } from '../../config/config';

import { Hospital } from 'src/app/models/hospital.model';

import { UsuarioService } from '../usuarios/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  url = URL_SERVICES;
  token: string;
  hospital: Hospital;

  constructor( private http: HttpClient,
               private router: Router,
               private _subirArchivoService: SubirArchivoService,
               private _usuariosService: UsuarioService) {
    this.token = this._usuariosService.token;
  }
  
  crearHospital( hospital: Hospital ){
    let url = this.url + '/hospital';
    url += '?token=' + this.token;

    return this.http.post( url, hospital ).pipe(
      map( (resp: any) => {

        swal('Éxito', 'Hospital' + hospital.nombre  + ' creado correctamente', 'success');
        return resp.hospital;

      })
    );

  }

  actualizarHospital( hospital: Hospital ){
    let url = this.url + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this.http.put( url, hospital ).pipe(
      map( (resp: any) => {

        swal('Éxito', 'Hospital ' + hospital.nombre  + ' actualizado correctamente', 'success');

        return resp;
      })
    );
  }

  cambiarImagen( file: File, id: string ){
    this._subirArchivoService.subirArchivo( file, 'hospitales', id )
      .then( (resp: any)=> {
        this.hospital.img = resp.hospital.img;
        swal('Éxito', 'Imagen de ' + resp.hospital.nombre  + ' actualizada correctamente', 'success');
        this.guardarStorage( resp.hospital._id, this.token, resp.hospital );
      })
      .catch( err => {
        console.log(err);
      });

  }

  cargarHospitales(desde: number = 0){
    let url = URL_SERVICES + '/hospital?desde=' + desde;
    return this.http.get( url );
  }

  cargarHospitalPorId(id: string){
    let url = URL_SERVICES + '/hospital/' + id + '?token=' + this.token;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.hospital )
    );
  }

  buscarHospitales( term: string){
    let url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + term;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.hospitales)
    );
  }

  borrarHospital( id: string ){
    let url = URL_SERVICES + '/hospital/' + id + '?token=' + this.token;
    return this.http.delete( url );
  }
  

  cargarStorage(){
    if( localStorage.getItem( 'token' ) ){
      this.token   = localStorage.getItem( 'token' );
      this.hospital = JSON.parse( localStorage.getItem( 'hospital') );
    }
  }

  limpiarStorage(){
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'hospital' );
    localStorage.removeItem( 'id' );
  }


  guardarStorage( id: string, token: string, hosp: Hospital){
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'hospital', JSON.stringify( hosp ) );

    this.hospital = hosp;
    this.token    = token;
  }

}

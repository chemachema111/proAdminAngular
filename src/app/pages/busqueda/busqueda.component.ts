import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  desdeUsuarios = 0;
  desdeMedicos = 0;
  desdeHospitales = 0;


  constructor( private activatedRoute: ActivatedRoute,
               private http: HttpClient ) {
    activatedRoute.params.subscribe( params => {
      const termino = params['termino'];
      this.buscar( termino );
    });
   }

  ngOnInit() {
  }

  buscar( termino: string) {
    let url = URL_SERVICES + '/busqueda/todo/' + termino;
    this.http.get( url )
      .subscribe( (resp: any) => {
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      });
  }

  
/*
  cambiarDesde( valor: number, tipo: string ) {
    let desde;
    switch (tipo) {
      case 'hospital':
        this.desdeHospitales = this.desdeHospitales + valor;
        if ( this.desdeHospitales >= this.hospitales.length ) {
          return;
        }
        if ( this.desdeHospitales < 0) {
          return;
        }

        break;

      case 'medico':
        this.desdeMedicos = this.desdeMedicos + valor;
        if ( this.desdeMedicos >= this.medicos.length ) {
          return;
        }
        if ( this.desdeMedicos < 0) {
          return;
        }

        break;

      case 'usuario':
        this.desdeUsuarios = this.desdeUsuarios + valor;
        if ( this.desdeUsuarios >= this.usuarios.length ) {
          return;
        }
        if ( this.desdeUsuarios < 0) {
          return;
        }

        break;

      default:
        break;
    }
    this.cargarMedicos();
  }
  */
}

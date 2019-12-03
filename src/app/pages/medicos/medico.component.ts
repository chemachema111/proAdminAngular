import { Component, OnInit } from '@angular/core';

import { MedicoService } from '../../services/medicos/medico.service';

import { Medico } from 'src/app/models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/hospitales/hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medico: Medico;

  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');

  constructor(private _medicosService: MedicoService,
              private _hospitalService: HospitalService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _modalUploadService: ModalUploadService ) {
    this.medico = new Medico('', '', '', '', '');

    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if( id !== 'nuevo' ){
        this.cargarMedico(id);
      }

    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe(
      (resp: any) => this.hospitales = resp.hospitales
    );

    this._modalUploadService.notificacion
      .subscribe( resp => {
        this.medico.img = resp.medico.img;
      });

  }
  
/*
  crearMedico() {
    swal({
      title: 'Crear medico',
      text: 'Introduzca un nombre para el nuevo medico',
      content: 'input',
      buttons: true,
    })
    .then(( nuevoNombre ) => {
      const medico = new Medico( nuevoNombre );
      if ( nuevoNombre ) {
        this._medicosService.crearMedico( medico )
          .subscribe(
            resp => {
              swal('El medico ' + nuevoNombre + ' fué creado!', {
                icon: 'success',
              });
              // this.cargarMedicos();
            },
            err => console.log(err)
          );
          
      } else {
        swal('No se realizaron cambios!');
      }
    });
  }
*/
  
  crearMedico( form: NgForm ) {

    if (form.invalid){
      return;
    }
    console.log(this.medico);

    this._medicosService.guardarMedico( this.medico )
      .subscribe( resp => {
        this.medico._id = resp._id;
        this.router.navigate(['/medico', this.medico._id]);
      });
     
  }

  guardarMedico( medico: Medico ) {
    this._medicosService.actualizarMedico( medico )
      .subscribe( resp => console.log(resp) );
  }

  cambioHospital( id: string ){
    this._hospitalService.cargarHospitalPorId( id )
      .subscribe( (resp: Hospital) => {
        this.hospital = resp;
      });
  }

  cargarMedico( id: string ){
    this._medicosService.cargarMedicoPorId( id )
      .subscribe( (medico: Medico) => {
        this.medico = medico;
        console.log(medico);
        this.medico.hospital = medico.hospital._id;

        this.cambioHospital( this.medico.hospital );
      });
  }

  cambiarFoto(){
    this._modalUploadService.showModal('medicos', this.medico._id);
  }

}

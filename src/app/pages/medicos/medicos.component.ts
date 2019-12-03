import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medicos/medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from '../../services/hospitales/hospital.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  term: string;

  cargando = true;

  constructor( private _medicosService: MedicoService,
               public _hospitalesService: HospitalService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarMedicos();

    this._modalUploadService.notificacion
      .subscribe( resp => this.cargarMedicos() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.showModal( 'medicos', id);
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicosService.cargarMedicos( this.desde )
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;
        this.cargando = false;
      });

  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }

  buscarMedicos( term: string) {
    if ( term.length > 0) {
      this._medicosService.buscarMedicos( term )
        .subscribe( resp => {
            this.medicos = resp;
        });
    } else {
      this.cargarMedicos();
    }
  }

  borrarMedico( medico: Medico ) {
    swal({
      title: 'Estas seguro?',
      text: 'Esta acción no tiene vuelta atras!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(( borrar ) => {
      if ( borrar ) {
        this._medicosService.borrarMedico( medico._id )
          .subscribe(
            resp => {
              swal('Poof! El medico fué borrado!', {
                icon: 'success',
              });
              this.cargarMedicos();
            }
          );
          
      } else {
        swal('El medico esta a salvo!');
      }
    });
  }
}

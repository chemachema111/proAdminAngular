import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospitales/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from 'src/app/models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  term: string;

  cargando = true;

  constructor( private _hospitalesService: HospitalService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe( resp => this.cargarHospitales() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.showModal( 'hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalesService.cargarHospitales( this.desde )
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
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
    this.cargarHospitales();
  }

  buscarHospitales( term: string) {
    if ( term.length > 0) {
      this._hospitalesService.buscarHospitales( term )
        .subscribe( resp => {
            this.hospitales = resp;
            console.log(resp);
        });
    } else {
      this.cargarHospitales();
    }
  }

  borrarHospital( hospital: Hospital ) {
    swal({
      title: 'Estas seguro?',
      text: 'Esta acción no tiene vuelta atras!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(( borrar ) => {
      if ( borrar ) {
        this._hospitalesService.borrarHospital( hospital._id )
          .subscribe(
            resp => {
              swal('Poof! El hospital fué borrado!', {
                icon: 'success',
              });
              this.cargarHospitales();
            }
          );
          
      } else {
        swal('El hospital esta a salvo!');
      }
    });
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Introduzca un nombre para el nuevo hospital',
      content: 'input',
      buttons: true,
    })
    .then(( nuevoNombre ) => {
      const hospital = new Hospital( nuevoNombre );
      if ( nuevoNombre ) {
        this._hospitalesService.crearHospital( hospital )
          .subscribe(
            resp => {
              swal('El hospital ' + nuevoNombre + ' fué creado!', {
                icon: 'success',
              });
              this.cargarHospitales();
            }
          );
          
      } else {
        swal('No se realizaron cambios!');
      }
    });
  }


  guardarHospital( hospital: Hospital ) {

    this._hospitalesService.actualizarHospital( hospital )
      .subscribe(
        resp => {
          console.log(resp);
        }
      );
     
  }

}

import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  
  imagenSubida: File;
  tempImg: string | ArrayBuffer;

  constructor( public _modalUploadService : ModalUploadService,
               private _subirArchivosService: SubirArchivoService ) {
    console.log('Modal listo');
   }

  ngOnInit() {
  }

  seleccionImagen( archivo: File ){
    if( !archivo ){
      this.imagenSubida = null;
      return;
    }

    if( archivo.type.indexOf('image') === -1 ){
      swal('Solo imágenes', 'El archivo no es una imagen', 'error');
      this.imagenSubida = null;
      return;
    }

    // Lector imágenes
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.tempImg = reader.result;

    this.imagenSubida = archivo;
  }

  subirImagen(){
    this._subirArchivosService.subirArchivo( this.imagenSubida, this._modalUploadService.tipo, this._modalUploadService.id )
      .then( resp => {

        this._modalUploadService.notificacion.emit( resp );
        this.cerrarModal();

      })
      .catch( err => console.log('Error al cargar', err) );

  }

  cerrarModal(){
    this.imagenSubida = null;
    this.tempImg      = null;
    this._modalUploadService.hideModal();
  }

}

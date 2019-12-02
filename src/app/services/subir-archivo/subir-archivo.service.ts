import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ){

    return new Promise( (res, rej) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append('imagen', archivo, archivo.name);
  
      xhr.onreadystatechange = () => {
        if( xhr.readyState === 4 ){
  
          if( xhr.status === 200 ){
            console.log('Imagen subida');
            res( JSON.parse( xhr.response ) );
          } else {
            console.log('Erro al subir archivo');
            rej( JSON.parse( xhr.response ) );
          }
  
        }
      };

      let url = URL_SERVICES + '/upload/' + tipo + '/' + id;

      xhr.open('put', url, true);
      xhr.send( formData );


    });

  }
}

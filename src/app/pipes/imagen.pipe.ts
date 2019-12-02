import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {


    let url = URL_SERVICES + '/img';

    if( img.indexOf('https') > -1 ){
      return img;
    }

    if( !img ){
      return url + '/usuarios/noimg';
    }

    switch (tipo) {
      case 'usuarios':
        url = url + '/usuarios/' + img;
        
        break;
      case 'medicos':
        url = url + '/medicos/' + img;
        
        break;
      case 'hospitales':
        url = url + '/hospitales/' + img;
        
        break;
    
      default:
        url += '/usuarios/noimg';
        break;
    }
    
    return url;
  }

}

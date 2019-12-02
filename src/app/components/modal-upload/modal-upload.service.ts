import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  tipo: string;
  id: string;

  oculto: string = 'oculto';

  notificacion: EventEmitter<any> = new EventEmitter<any>();

  constructor() { 
    console.log('Modal service listo');
  }

  hideModal(){    
    this.oculto = 'oculto';
    this.tipo = null;
    this.id   = null;
  }

  showModal( tipo: string, id: string ){
    this.oculto = '';
    this.tipo = tipo;
    this.id   = id;
  }

}

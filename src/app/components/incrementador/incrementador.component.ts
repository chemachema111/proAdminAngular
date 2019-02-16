import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') public leyenda: string = 'Leyenda';
  @Input() public progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    //console.log('leyenda', this.leyenda);
    //console.log('progreso', this.progreso);
   }

  ngOnInit() {
    //console.log('progreso', this.progreso);
  }

  onChanges( newValue: number){

    //let elemtHtml: any = document.getElementsByName('progreso')[0];


    if (newValue >= 100){
      this.progreso = 100
    } else if (newValue <= 0){
      this.progreso = 0
    } else {
      this.progreso = newValue;
    }

    //elemtHtml.value = Number( this.progreso )

    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );

    console.log(this.txtProgress);
  }

  cambiarValor( valor ){

    if ( this.progreso >= 100 && valor > 0){
      return;
    }

    if ( this.progreso <= 0 && valor < 0){
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambioValor.emit( this.progreso );

    //Establecer el foco en el elemento
    this.txtProgress.nativeElement.focus();
  }

}

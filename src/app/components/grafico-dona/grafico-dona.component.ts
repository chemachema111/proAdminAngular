import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
      // Doughnut
      @Input('etiquetas') public doughnutChartLabels:string[] = [];
      @Input('datos') public doughnutChartData:number[] = [];
      @Input('tipo') public doughnutChartType:string = '';

  constructor() { }

  ngOnInit() {
  }

}

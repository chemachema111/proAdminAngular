import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public subscription: Subscription;

  constructor() { 

    

    this.subscription = this.devuelveObservable()
    

    .subscribe(
      //Primer callback cuando recibimos datos de observer
       numero => console.log( 'Subs', numero ),

       
      //Segundo callback cuando recibimos un error
       error => console.error( 'Error en el ', error ),

       
      //Tercer callback cuando se finaliza ( no recibe parametro -> () => funcion )
       () => console.log('El observador terminó')

      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Lapag terminó');
    this.subscription.unsubscribe();
  }

  devuelveObservable(): Observable<any>  {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let interval = setInterval( () => {

        contador++;

        const salida = {
          valor: contador
        };

        observer.next( salida );
        /*
        if ( contador === 3 ){

          clearInterval( interval );

          //Complete es un metodo del observable
          observer.complete();
        }
        */
        /* Test
        if ( contador === 2 ){

          clearInterval( interval );

          //Error es un metodo del observable
          observer.error('contador === 2');

        }
        */

      }, 1000);

    }).pipe( 

      map( resp => resp.valor ),
      filter( ( valor, index ) => {

      //Filtro para subscribe si es par/impar
        if ( (valor % 2) !== 0 ){
          console.log('Filter: ' + valor , index);

          //impar
          return true;

        } else {
          //par
          return false;
        }

      })
     );

  }

}

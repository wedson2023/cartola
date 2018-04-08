import { Component } from '@angular/core';

/**
 * Generated class for the MercadoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mercado',
  templateUrl: 'mercado.html'
})
export class MercadoComponent {

  text: string;

  constructor() {
    console.log('Hello MercadoComponent Component');
    this.text = 'Hello World';
  }

}

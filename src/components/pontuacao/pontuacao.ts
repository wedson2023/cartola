import { Component } from '@angular/core';

/**
 * Generated class for the PontuacaoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pontuacao',
  templateUrl: 'pontuacao.html'
})
export class PontuacaoComponent {

  text: string;

  constructor() {
    console.log('Hello PontuacaoComponent Component');
    this.text = 'Hello World';
  }

}

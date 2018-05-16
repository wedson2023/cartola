import { Component, Input } from '@angular/core';

@Component({
  selector: 'formacao4-4-2',
  templateUrl: 'formacao4-4-2.html'
})
export class Formacao4_4_2Component {

  @Input() escalacao;
  @Input() time;

  constructor() {
  }

}

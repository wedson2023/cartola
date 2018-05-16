import { Component, Input } from '@angular/core';

@Component({
  selector: 'formacao5-3-2',
  templateUrl: 'formacao5-3-2.html'
})
export class Formacao5_3_2Component {

  @Input() escalacao;
  @Input() time;

  constructor() {}

}

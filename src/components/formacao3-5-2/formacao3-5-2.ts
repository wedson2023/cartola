import { Component, Input } from '@angular/core';

@Component({
  selector: 'formacao3-5-2',
  templateUrl: 'formacao3-5-2.html'
})
export class Formacao3_5_2Component {

  @Input() escalacao;
  @Input() time;

  constructor() {}

}

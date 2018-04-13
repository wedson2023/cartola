import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ParciaisTimesPage } from '../parciais-times/parciais-times';
import { ParciaisJogadoresPage } from '../parciais-jogadores/parciais-jogadores';
import { ParciaisClubesPage } from '../parciais-clubes/parciais-clubes';

@IonicPage()
@Component({
  selector: 'page-parciais',
  templateUrl: 'parciais.html',
})
export class ParciaisPage {

  tab1 = ParciaisTimesPage;
  tab2 = ParciaisJogadoresPage;
  tab3 = ParciaisClubesPage;

  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParciaisPage');
  }

}

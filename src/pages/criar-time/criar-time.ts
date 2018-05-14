import { TransacoesPage } from './../transacoes/transacoes';
import { MeuTimePage } from './../meu-time/meu-time';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { CampinhoPage } from '../campinho/campinho';

@IonicPage()
@Component({
  selector: 'page-criar-time',
  templateUrl: 'criar-time.html',
})
export class CriarTimePage {

  tab1 = MeuTimePage;
  tab2 = CampinhoPage;
  tab3 = TransacoesPage;

  rodada_atual;

  constructor(private nav: NavParams) {
    this.rodada_atual = this.nav.get('rodada_atual');
  }
}

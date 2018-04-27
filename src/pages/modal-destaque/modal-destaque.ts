import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { HistoricoPage } from '../historico/historico';

@IonicPage()
@Component({
  selector: 'page-modal-destaque',
  templateUrl: 'modal-destaque.html',
})
export class ModalDestaquePage {

  times;
  destaques:object;
  rodada_atual:Number;

  constructor( 
    private navParams: NavParams,
    private ModalController: ModalController
  ) 
  { 
    this.rodada_atual = this.navParams.get('rodada_atual');
    this.povoar_destaques(this.navParams.get('times'));
  }

  povoar_destaques(times){
    this.destaques = { 
      pontuador : this.setCampeaoRodada(times),
      lanterna : this.setLanternaRodada(times),
      patrimonio : this.setPatrimonio(times),
      mes : this.setMes(times),
      turno : this.setTurno(times)
    }
  }

  setCampeaoRodada(times){
    return times.sort((a,b) => (a.ranking.rodada > b.ranking.rodada) ? 1 : ((a.ranking.rodada < b.ranking.rodada) ? -1 : 0))[0];
  }
  
  setLanternaRodada(times){
    return times.sort((a,b) => (a.ranking.rodada > b.ranking.rodada) ? -1 : ((a.ranking.rodada < b.ranking.rodada) ? 1 : 0))[0];
  }
  
  setPatrimonio(times){
    return times.sort((a,b) => (a.ranking.patrimonio > b.ranking.patrimonio) ? 1 : ((a.ranking.patrimonio < b.ranking.patrimonio) ? -1 : 0))[0];
  }
  
  setMes(times){
    return times.sort((a,b) => (a.ranking.mes > b.ranking.mes) ? 1 : ((a.ranking.mes < b.ranking.mes) ? -1 : 0))[0];
  }
  
  setTurno(times){
    return times.sort((a,b) => (a.ranking.turno > b.ranking.turno) ? 1 : ((a.ranking.turno < b.ranking.turno) ? -1 : 0))[0];
  }  

  historico(time){
    let modal = this.ModalController.create(HistoricoPage, { time : { slug : time }, rodada_atual : this.rodada_atual });
    modal.present();
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-destaque',
  templateUrl: 'modal-destaque.html',
})
export class ModalDestaquePage {

  times;
  destaques:object;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams
  ) 
  {    
    delete this.navParams.data['component'];
    delete this.navParams.data['opts'];
    this.povoar_destaques(this.navParams.data);
  }

  povoar_destaques(times){
    this.destaques = { 
      pontuador : this.setCampeaoRodada(times),
      lanterna : this.setLanternaRodada(times),
      patrimonio : this.setPatrimonio(times),
      mes : this.setMes(times),
      turno : this.setTurno(times)
    }

    console.log(this.destaques);
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


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-partidas',
  templateUrl: 'partidas.html',
})
export class PartidasPage {

  private data;
  private partidas;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  )
  {

  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    for(let partida of this.data.partidas)
    {      
      partida.casa = this.data.clubes[partida.clube_casa_id];
      partida.visitante = this.data.clubes[partida.clube_visitante_id];
    }
    this.partidas = this.data.partidas.sort((a,b) => a.partida_data > b.partida_data ? 1 : -1);;
  }

}

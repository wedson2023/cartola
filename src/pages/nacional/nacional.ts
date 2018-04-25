import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { HistoricoPage } from '../historico/historico';

@IonicPage()
@Component({
  selector: 'page-nacional',
  templateUrl: 'nacional.html',
})
export class NacionalPage {
  
  time_nacional;
  time_nacionaloff;
  rodada_atual;

  constructor(
    private navParams: NavParams,
    private http: HttpProvider,
    private navegaroff: NavegaroffProvider,
    private loadingCtrl: LoadingController,
    private ModalController: ModalController
  ) {    
    this.rodada_atual = this.navParams.get('rodada_atual');
    this.time_nacionaloff = this.navegaroff.getItem('time_nacional');
  }  

  historico(time){
    let modal = this.ModalController.create(HistoricoPage, { time : { slug : time }, rodada_atual : this.rodada_atual.rodada });
    modal.present();
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('pos-rodada/destaques').subscribe(response => {
      this.navegaroff.setItem('time_nacional', response);
      this.time_nacional = response;
      loading.dismiss();
    }, err => {
      this.time_nacional = this.time_nacionaloff;
      loading.dismiss();
    })
  }
}

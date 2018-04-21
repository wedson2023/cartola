import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-meu-time',
  templateUrl: 'meu-time.html',
})
export class MeuTimePage {

  private meu_time;
  private meu_timeoff;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider
  ) {
    this.meu_timeoff = this.navegaroff.getItem('meu_time');
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    this.http.getApi('auth/time').subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));

      for(let x in resposta.atletas)
      {
        resposta.atletas[x].scout = (resposta.atletas[x].scout || {});
        resposta.atletas[x].escudo = resposta.clubes[resposta.atletas[x].clube_id].escudos['60x60'];
        resposta.atletas[x].posicao = resposta.posicoes[resposta.atletas[x].posicao_id].abreviacao;
        resposta.atletas[x].capitao = resposta.capitao_id == resposta.atletas[x].atleta_id ? 'sim' : 'não';
      }
      resposta.atletas.sort((a, b) => a.posicao_id - b.posicao_id)
      this.navegaroff.setItem('meu_time', resposta);
      this.meu_time = resposta;
      loading.dismiss();
    }, err => {
      this.meu_time = this.meu_timeoff;
      loading.dismiss();
    })
  }

}

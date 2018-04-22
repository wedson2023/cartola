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
  private pontuacao_total;
  private last_updated;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider
  ) {
    this.pontuacao_total = 0;
    this.meu_timeoff = this.navegaroff.getItem('meu_time');
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    this.http.getApi('auth/time').subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));
      this.http.getApi('atletas/pontuados').subscribe(atletas => {
        let atleta = JSON.parse(JSON.stringify(atletas));
        let pontuacao_total = 0;
        for(let x in resposta.atletas)
        {  
          let at = resposta.atletas[x];
          at.scout = (atleta.atletas[at.atleta_id] ? atleta.atletas[at.atleta_id].scout : {});
          at.pontos_num = (atleta.atletas[at.atleta_id] ? atleta.atletas[at.atleta_id].pontuacao : 0);
          at.escudo = resposta.clubes[at.clube_id].escudos['60x60'];
          at.posicao = resposta.posicoes[at.posicao_id].abreviacao;
          at.capitao = resposta.capitao_id == at.atleta_id ? 'sim' : 'não';
          pontuacao_total += at.pontos_num;
        }
        console.log(resposta);
        this.pontuacao_total = pontuacao_total;
        resposta.atletas.sort((a, b) => a.posicao_id - b.posicao_id)
        this.navegaroff.setItem('hr_parciais_meu_time', new Date());
        this.navegaroff.setItem('meu_time', resposta);
        this.last_updated = new Date();
        this.meu_time = resposta;
        loading.dismiss();
      });
    }, err => {
      this.last_updated = this.navegaroff.getItem('hr_parciais_meu_time');
      this.meu_time = this.meu_timeoff;
      loading.dismiss();
    })
  }

}

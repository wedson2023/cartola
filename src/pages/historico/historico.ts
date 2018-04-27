import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage { 

  private time;
  public historico:Object;
  public lista_rodadas:Number[];
  private rodada_atual;


  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private http: HttpProvider,
    private mensagem: MensagemProvider
  ) 
  {
    let todas_rodadas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];
    this.time = this.navParams.get('time');
    this.rodada_atual = this.navParams.get('rodada_atual');
    this.lista_rodadas = todas_rodadas.splice(0, this.rodada_atual);
  }

  buscar(rodada_atual){
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('/time/slug/' + this.time.slug + '/' + rodada_atual).subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));
      for(let x in resposta.atletas)
      {
        resposta.atletas[x].scout = (resposta.atletas[x].scout || {});
        resposta.atletas[x].posicao = resposta.posicoes[resposta.atletas[x].posicao_id].abreviacao;
        resposta.atletas[x].escudo = resposta.clubes[resposta.atletas[x].clube_id].escudos['45x45'];
        resposta.atletas[x].capitao = resposta.capitao_id === resposta.atletas[x].atleta_id ? 'sim' : 'não';
      }
     
      resposta.atletas = resposta.atletas.sort((a,b) => a.posicao_id > b.posicao_id ? -1 : 1);
      this.historico = resposta;
      loading.dismiss();
    }, err => {
      loading.dismiss();      
      this.mensagem.mensagem('Algo deu errado', 'Verifique sua conexão com a internet');
    })
  }

  ionViewDidLoad() { 
    this.buscar(this.rodada_atual);
  }
}

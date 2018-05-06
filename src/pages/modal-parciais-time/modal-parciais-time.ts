import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ModalController } from 'ionic-angular';
import { TemJogadorPage } from '../tem-jogador/tem-jogador';

@IonicPage()
@Component({
  selector: 'page-modal-parciais-time',
  templateUrl: 'modal-parciais-time.html',
})
export class ModalParciaisTimePage {
  private time;
  private atletas;
  private parciais;
  private pontuacao_total;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private Mensagem: MensagemProvider,
    private viewCtrl: ViewController,
    private ModalController: ModalController
  ) {
    this.time = this.navParams.get('time');
    this.atletas = this.navParams.get('atletas');
  }

  

  tem_jogador(atleta){
    let modal = this.ModalController.create(TemJogadorPage, { pontuacao : atleta.pontuacao, atleta_id : atleta.atleta_id, apelido : atleta.apelido, foto : atleta.foto });
    modal.present();
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('time/slug/' + this.time.slug + '/' + this.time.rodada).subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));
      let pontuacao_total = 0;
      for(let x in resposta.atletas)
      {
        let at = resposta.atletas[x];
        at.scout = this.atletas === undefined ? at.scout : (this.atletas.atletas[at.atleta_id] ? this.atletas.atletas[at.atleta_id].scout : {});
        at.pontos_num = this.atletas === undefined ? at.pontos_num : (this.atletas.atletas[at.atleta_id] ? this.atletas.atletas[at.atleta_id].pontuacao : 0);
        at.escudo = resposta.clubes[at.clube_id].escudos['60x60'];
        at.posicao = resposta.posicoes[at.posicao_id].abreviacao;
        at.capitao = resposta.capitao_id == at.atleta_id ? 'sim' : 'não';
        pontuacao_total += resposta.capitao_id == at.atleta_id ? (at.pontos_num * 2) : at.pontos_num;
      }
      this.pontuacao_total = pontuacao_total;
      resposta.atletas.sort((a, b) => a.posicao_id - b.posicao_id)
      this.parciais = resposta;
      loading.dismiss();
    }, err => {
      this.viewCtrl.dismiss();
      this.Mensagem.mensagem('Algo deu errado', 'Verifique sua conexão com a internet!');
      loading.dismiss();
    })
  }

}

import { LoginPage } from './../login/login';
import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

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
  private token_meu_time;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider,
    private ModalController: ModalController
  ) {
    this.pontuacao_total = 0;
    this.meu_timeoff = this.navegaroff.getItem('meu_time');
    this.token_meu_time = localStorage.getItem('token_meu_time');
  }

  login(){
    let modal = this.ModalController.create(LoginPage);
    modal.present();
    modal.onDidDismiss((token) => {      
      this.http.setToken(token); 
      this.ionViewDidLoad(token); 
      this.token_meu_time = localStorage.getItem('token_meu_time') ? true : false; 
    })    
  }

  ionViewDidLoad(auth) {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    this.http.getApi('auth/time').subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));
      this.http.getApi('atletas/pontuados').subscribe(atletas => {
        if(atletas){
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
            pontuacao_total += resposta.capitao_id == at.atleta_id ? (at.pontos_num * 2) : at.pontos_num;
          }
          this.pontuacao_total = pontuacao_total;
        }
        else
        {
          for(let x in resposta.atletas)
          {  
            let at = resposta.atletas[x];
            at.scout = {};
            at.escudo = resposta.clubes[at.clube_id].escudos['60x60'];
            at.posicao = resposta.posicoes[at.posicao_id].abreviacao;
            at.capitao = resposta.capitao_id == at.atleta_id ? 'sim' : 'não';
          }
          this.pontuacao_total = 0;
        } 

        resposta.atletas.sort((a, b) => a.posicao_id - b.posicao_id);
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

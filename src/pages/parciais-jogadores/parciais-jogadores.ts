import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController } from 'ionic-angular';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';
import { HttpProvider } from '../../providers/http/http';
import { TemJogadorPage } from '../tem-jogador/tem-jogador';

@IonicPage()
@Component({
  selector: 'page-parciais-jogadores',
  templateUrl: 'parciais-jogadores.html',
})
export class ParciaisJogadoresPage {
  private last_updated;
  private atletasoff;
  private atletas;

  constructor(
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private LoadingController: LoadingController,
    private navegaroff: NavegaroffProvider,
    public ModalController: ModalController
  ) {
    this.atletasoff = navegaroff.getItem('parciais_atletas');
  }

  tem_jogador(atleta){
    let modal = this.ModalController.create(TemJogadorPage, { atleta_id : atleta.atleta_id, apelido : atleta.apelido, foto : atleta.foto });
    modal.present();
  }

  carregar(refresh){    
    this.http.getApi('atletas/pontuados').subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));

      for(let x in resposta.atletas)
      {
        resposta.atletas[x].posicao = resposta.posicoes[resposta.atletas[x].posicao_id].nome;
        resposta.atletas[x].clube = resposta.clubes[resposta.atletas[x].clube_id].escudos['45x45']; 
      }

      let atletas = [];
      for(let i in resposta.atletas)
      {
        resposta.atletas[i].atleta_id = i;
        atletas.push(resposta.atletas[i]);
      }

      atletas.sort((a,b) => a.pontuacao > b.pontuacao ? -1 : 1);       
      this.atletas = atletas; 
      this.navegaroff.setItem('hr_parciais_atletas', new Date());
      this.navegaroff.setItem('parciais_atletas', atletas);
      this.last_updated = new Date();      
      refresh.complete();
    }, err => refresh.complete() )
  }

  ionViewDidLoad(refresh) {
    let loading = this.LoadingController.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('atletas/pontuados').subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));

      for(let x in resposta.atletas)
      {
        resposta.atletas[x].posicao = resposta.posicoes[resposta.atletas[x].posicao_id].nome;
        resposta.atletas[x].clube = resposta.clubes[resposta.atletas[x].clube_id].escudos['45x45']; 
      }

      let atletas = [];
      for(let i in resposta.atletas)
      {
        resposta.atletas[i].atleta_id = i;
        atletas.push(resposta.atletas[i]);
      }

      atletas.sort((a,b) => a.pontuacao > b.pontuacao ? -1 : 1);       
      this.atletas = atletas; 
      this.navegaroff.setItem('hr_parciais_atletas', new Date());
      this.navegaroff.setItem('parciais_atletas', atletas);
      this.last_updated = new Date();
      loading.dismiss();    
    }, err => {
      this.last_updated = this.navegaroff.getItem('hr_parciais_atletas');
      this.atletas = this.atletasoff;
      loading.dismiss(); 
      }  
    )
  }

}

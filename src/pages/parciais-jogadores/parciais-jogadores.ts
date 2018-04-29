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
    private LoadingController: LoadingController,
    private navegaroff: NavegaroffProvider,
    public ModalController: ModalController
  ) {
    this.atletasoff = navegaroff.getItem('parciais_atletas');
  }

  tem_jogador(atleta){
    let modal = this.ModalController.create(TemJogadorPage, { pontuacao : atleta.pontuacao, atleta_id : atleta.atleta_id, apelido : atleta.apelido, foto : atleta.foto });
    modal.present();
  }

  carregar(refresh){  
    this.ionViewDidLoad(refresh);  
  }

  ionViewDidLoad(refresh) {
    let loading = this.LoadingController.create({ content: 'Por favor aguarde...' });
    if(!refresh) loading.present();

    this.http.getApi('atletas/pontuados').subscribe(response => {
      loading.dismiss(); 
      let resposta = JSON.parse(JSON.stringify(response));

      for(let x in resposta.atletas)
      {
        if(resposta.posicoes[resposta.atletas[x].posicao_id] && resposta.clubes[resposta.atletas[x].clube_id])
        {
          resposta.atletas[x].posicao = resposta.posicoes[resposta.atletas[x].posicao_id].nome;
          resposta.atletas[x].clube = resposta.clubes[resposta.atletas[x].clube_id].escudos['45x45']; 
        }        
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
      if(refresh) refresh.complete();         
    }, err => {
      this.last_updated = this.navegaroff.getItem('hr_parciais_atletas');
      this.atletas = this.atletasoff;
      if(refresh) refresh.complete();
      loading.dismiss(); 
      }  
    )
  }

}

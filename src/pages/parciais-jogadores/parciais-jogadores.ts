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
      if(response == null){ 
        this.last_updated = this.navegaroff.getItem('hr_parciais_atletas');
        this.atletas = this.atletasoff;
        if(refresh) refresh.complete();
        loading.dismiss();
      }
      else
      {
        for(let x in response['atletas'])
        {
          if(response['posicoes'][response['atletas'][x].posicao_id] && response['clubes'][response['atletas'][x].clube_id])
          {
            response['atletas'][x].posicao = response['posicoes'][response['atletas'][x].posicao_id].nome;
            response['atletas'][x].clube = response['clubes'][response['atletas'][x].clube_id].escudos['45x45']; 
          }        
        }

        let atletas = [];
        for(let i in response['atletas'])
        {
          response['atletas'][i].atleta_id = i;
          atletas.push(response['atletas'][i]);
        }

        atletas.sort((a,b) => a.pontuacao > b.pontuacao ? -1 : 1);       
        this.atletas = atletas; 
        this.navegaroff.setItem('hr_parciais_atletas', new Date());
        this.navegaroff.setItem('parciais_atletas', atletas);
        this.last_updated = new Date();
        if(refresh) refresh.complete();
        loading.dismiss(); 
      }         
    }, err => {
      this.last_updated = this.navegaroff.getItem('hr_parciais_atletas');
      this.atletas = this.atletasoff;
      if(refresh) refresh.complete();
      loading.dismiss(); 
      }  
    )
  }

}

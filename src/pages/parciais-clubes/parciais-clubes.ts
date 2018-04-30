import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';
import { MensagemProvider } from '../../providers/mensagem/mensagem';

@IonicPage()
@Component({
  selector: 'page-parciais-clubes',
  templateUrl: 'parciais-clubes.html',
})
export class ParciaisClubesPage {
  private last_updated;
  public partidas;
  private partidasoff;
  private atletas;
  private show_parciais;

  constructor(
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider,
    private Mensagem: MensagemProvider
  ) {
    this.partidasoff = this.navegaroff.getItem('partidas_rodadas'); 
  }

  parciais_jogadores(clubes){  
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    
    this.http.getApi('atletas/pontuados').subscribe(response => {  

      let atletas = { casa : [], visitante : [] };
      for(let x in response['atletas'])
      {
        if(response['posicoes'][response['atletas'][x].posicao_id]){

          response['atletas'][x].posicao = response['posicoes'][response['atletas'][x].posicao_id].abreviacao;
          if(response['atletas'][x].clube_id == clubes.clube_casa_id)
          {
            atletas.casa.push(response['atletas'][x]);
          }
          else if(response['atletas'][x].clube_id == clubes.clube_visitante_id)
          {
            atletas.visitante.push(response['atletas'][x]);
          }    
        }            
      }

      atletas.casa.sort((a,b) => a.posicao_id > b.posicao_id ? -1 : 1); 
      atletas.visitante.sort((a,b) => a.posicao_id > b.posicao_id ? -1 : 1);       
      this.atletas = atletas;
      this.show_parciais = clubes.clube_casa_id;   
      loading.dismiss();     
    }, err =>{
      this.Mensagem.mensagem('Algo deu errado', 'Verifique sua conexão com a internet ou as parciais não estão disponível.');
      loading.dismiss(); 
    })
  }

  carregar(refresh){
    this.http.getApi('partidas').subscribe(response => {
      for(let partida of response['partidas'])
      {      
        partida.casa = response['clubes'][partida.clube_casa_id];
        partida.visitante = response['clubes'][partida.clube_visitante_id];
      }
      this.partidas = response['partidas'].sort((a,b) => a.partida_data > b.partida_data ? 1 : -1);
      this.navegaroff.setItem('hr_parciais_atletas', new Date());
      this.navegaroff.setItem('partidas_rodadas', this.partidas);
      this.last_updated = new Date();
      refresh.complete();    
    }, err =>{
      this.last_updated = this.navegaroff.getItem('hr_parciais_atletas');
      this.partidas = this.partidasoff;
      refresh.complete();
    })
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('partidas').subscribe(response => {      
      for(let partida of response['partidas'])
      {      
        partida.casa = response['clubes'][partida.clube_casa_id];
        partida.visitante = response['clubes'][partida.clube_visitante_id];
      }
      this.partidas = response['partidas'].sort((a,b) => a.partida_data > b.partida_data ? 1 : -1);
      this.navegaroff.setItem('hr_parciais_atletas', new Date());
      this.navegaroff.setItem('partidas_rodadas', this.partidas);
      this.last_updated = new Date();
      loading.dismiss();      
    }, err =>{
      this.last_updated = this.navegaroff.getItem('hr_parciais_atletas');
      this.partidas = this.partidasoff;
      loading.dismiss();
    })
  }

}

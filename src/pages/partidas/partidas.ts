import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';

@IonicPage()
@Component({
  selector: 'page-partidas',
  templateUrl: 'partidas.html',
})
export class PartidasPage {

  public partidas:object;
  private partidasoff:object;
  public rodada_atual:number;

  constructor(
    private http: HttpProvider,
    public loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider,
    private mensagem: MensagemProvider
  )
  {   
    this.partidasoff = this.navegaroff.getItem('partidas_rodadas'); 
  }

  dados_partidas(response:any, loading:any){
    if(response.mensagem == 'Rodada inválida.')
    { 
      this.mensagem.mensagem('Aguarde', 'Rodada não disponível no momento.');
      this.rodada_atual = this.rodada_atual - 1;
      loading.dismiss();
    }
    else
    {
      console.log(response);
      this.rodada_atual = response.rodada;
      for(let partida of response.partidas)
      {      
        partida.casa = response.clubes[partida.clube_casa_id];
        partida.visitante = response.clubes[partida.clube_visitante_id];
      }
      this.partidas = response.partidas.sort((a,b) => a.partida_data > b.partida_data ? 1 : -1);
      this.navegaroff.setItem('partidas_rodadas', this.partidas);
      loading.dismiss();
    }    
  }

  proxima_rodada(){
    if(this.rodada_atual == 38 || this.rodada_atual === undefined) return false;
    this.rodada_atual = this.rodada_atual + 1;

    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('partidas/' + this.rodada_atual).subscribe(response => {             
      this.dados_partidas(response, loading);
    }, err => {
      loading.dismiss();
      this.rodada_atual = this.rodada_atual - 1;
      this.mensagem.mensagem('Algo deu errado', 'A rodada não esta disponível ou você esta sem conexão com a internet.'); 
    });     
  }

  anterior_rodada(){
    if(this.rodada_atual == 1 || this.rodada_atual === undefined) return false;
    this.rodada_atual = this.rodada_atual - 1;  
    
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('partidas/' + this.rodada_atual).subscribe(response => {
      this.dados_partidas(response, loading);
    }, err => {
      loading.dismiss();
      this.rodada_atual = this.rodada_atual + 1;
      this.mensagem.mensagem('Algo deu errado', 'Verifique sua conexão com a ainternet.'); 
    }); 
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('partidas').subscribe(response => {
      this.dados_partidas(response, loading);         
    }, err =>{      
      this.partidas = this.partidasoff;
      loading.dismiss();
    }) 
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-partidas',
  templateUrl: 'partidas.html',
})
export class PartidasPage {

  private data;
  private partidas;
  public rodada_atual:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    public loadingCtrl: LoadingController 
  )
  {

  }

  dados_partidas(response:any, loading:any){
    if(response.mensagem == 'Rodada inválida.')
    {         
      alert('Rodada não disponível no momento.'); 
      this.rodada_atual = this.rodada_atual - 1;
      loading.dismiss();
    }
    else
    {
      for(let partida of response.partidas)
      {      
        partida.casa = response.clubes[partida.clube_casa_id];
        partida.visitante = response.clubes[partida.clube_visitante_id];
      }
      this.partidas = response.partidas.sort((a,b) => a.partida_data > b.partida_data ? 1 : -1);
      loading.dismiss();
    }    
  }

  proxima_rodada(){
    if(this.rodada_atual == 38) return false;
    this.rodada_atual = this.rodada_atual + 1;

    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('partidas/' + this.rodada_atual).subscribe(response => {             
      this.dados_partidas(response, loading);
    });     
  }

  anterior_rodada(){
    if(this.rodada_atual == 1) return false;
    this.rodada_atual = this.rodada_atual - 1;  
    
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('partidas/' + this.rodada_atual).subscribe(response => {
      this.dados_partidas(response, loading);
    }); 
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.data = this.navParams.get('data');
    this.rodada_atual = this.data.rodada;
    this.dados_partidas(this.data, loading);
  }

}

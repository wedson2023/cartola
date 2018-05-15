import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController } from 'ionic-angular';
import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';

@IonicPage()
@Component({
  selector: 'page-transacoes',
  templateUrl: 'transacoes.html',
})
export class TransacoesPage {

  transacoes;
  transacoesoff;
  lista_rodadas;
  rodada_atual;
  transacoes_num;

  pontuacao_total;



  constructor(
    public nav: NavParams,
    private http: HttpProvider,
    private navegaroff: NavegaroffProvider,
    private loadingCtrl: LoadingController
  ) {
    this.transacoesoff = this.navegaroff.getItem('transacoes_time');
    let todas_rodadas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];
    
    this.lista_rodadas = todas_rodadas.splice(0, this.nav.data);
  }

  buscar(rodada){
    this.ionViewDidLoad(rodada);
  }

  ionViewDidLoad(rodada) { 
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    
    this.http.getApi('auth/time/historico/' + (rodada || this.nav.data)).subscribe(response => {
      this.http.getApi('atletas/pontuados').subscribe(atletas => { 
        let pontuacao_total = 0;       
        if(atletas && (!rodada || rodada == this.nav.data))
        {
          for(let x in response)
          {
            let at = response[x]['escalacao'];
            at.sort((a,b) => a.posicao > b.posicao ? -1 : 1); 

            for(let i in at)
            {
              at[i].pontos_num = (atletas['atletas'][at[i].id] ? atletas['atletas'][at[i].id].pontuacao : 0);
              pontuacao_total += response[x]['capitao'].id == at[i].id ? (atletas['atletas'][at[i].id] ? (atletas['atletas'][at[i].id].pontuacao * 2) : 0) : (atletas['atletas'][at[i].id] ? atletas['atletas'][at[i].id].pontuacao : 0);
            }

            response[x].pontuacao_total = pontuacao_total;
            pontuacao_total = 0;
          }           
        } 
        else
        {
          for(let x in response)
          {
            response[x]['escalacao'].sort((a,b) => a.posicao > b.posicao ? -1 : 1); 
            response[x].pontuacao_total = 0;                
          }           
        } 

        this.transacoes_num = Object.keys(response).length; 
        this.transacoes = response;
        this.rodada_atual = (rodada || this.nav.data);
        this.navegaroff.setItem('transacoes_time', response);
        loading.dismiss();               
      }, err => {
        for(let x in response)
        {
          response[x]['escalacao'].sort((a,b) => a.posicao > b.posicao ? -1 : 1); 
          response[x].pontuacao_total = 0;                
        }
        this.transacoes_num = Object.keys(response).length; 
        this.transacoes = response;
        this.rodada_atual = (rodada || this.nav.data);
        loading.dismiss();
      })      
    }, err => {
      loading.dismiss();
      this.transacoes = this.transacoesoff;
    });
  }

}

import { NacionalPage } from './../nacional/nacional';
import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { Component } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { ModalController, PopoverController } from 'ionic-angular';

import { HistoricoPage } from '../historico/historico';
import { PartidasPage } from '../partidas/partidas';
import { HttpProvider } from '../../providers/http/http';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';
import { PontuacaoComponent } from '../../components/pontuacao/pontuacao';
import { ConfigPage } from '../config/config';
import { ClassificacaoPage } from '../classificacao/classificacao';
import { ModalDestaquePage } from '../modal-destaque/modal-destaque';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  liga;  
  ligaoff:object; 
  filtro:String;
  rodada_atual;

  constructor(
    public loadingCtrl: LoadingController,
    public ModalController: ModalController,
    private http:HttpProvider,
    private navegaroff: NavegaroffProvider,
    private popoverCtrl: PopoverController
  )   
  {
    this.filtro = 'campeonato';
    this.ligaoff = this.navegaroff.getItem('home_liga');     
  }

  config(){
    let modal = this.ModalController.create(ConfigPage);
    modal.present();
    modal.onDidDismiss(() => this.ionViewDidLoad());
  }

  pontuacao(){
    let popover = this.popoverCtrl.create(PontuacaoComponent);
    popover.present();
  }

  partidas(){
    let modal = this.ModalController.create(PartidasPage);
    modal.present();
  }
  
  classficacao(){
    let modal = this.ModalController.create(ClassificacaoPage);
    modal.present();
  }

  historico(time){
    let modal = this.ModalController.create(HistoricoPage, { time : time, rodada_atual : this.rodada_atual.rodada });
    modal.present();
  }

  destaques(){
    let modal = this.ModalController.create(ModalDestaquePage, { times : this.liga.times, rodada_atual : this.rodada_atual.rodada });
    modal.present();
  }

  nacional(){
    let modal = this.ModalController.create(NacionalPage, { rodada_atual : this.rodada_atual });
    modal.present();
  }

  filtrar(filtro){    
    this.liga.times.sort((a, b) => a.ranking[filtro] - b.ranking[filtro]);
  }

  ionViewDidLoad() { 
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

     this.http.getApi('auth/liga/' + localStorage.getItem('liga_padrao')).subscribe(response => {
      for(let x in response.times)
      {
        let r = response.times[x].ranking;

        r.campeonato = (r.campeonato || (response.times.length)) 
        r.rodada = (r.rodada || (response.times.length)) 
        r.patrimonio = (r.patrimonio || (response.times.length)) 
        r.mes = (r.mes || (response.times.length)) 
        r.turno = (r.turno || (response.times.length)) 
      }
      this.liga = response;      
      this.navegaroff.setItem('home_liga', response);
      loading.dismiss();
      this.http.getApi('partidas').subscribe(response => {
        this.rodada_atual = response;
      })
      
    }, err => {
      loading.dismiss();
      this.liga = this.ligaoff;
    })    
  }

}

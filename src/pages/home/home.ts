import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
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

  constructor(
    public navCtrl: NavController,
    public HttpClient: HttpClient,
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
    //this.navCtrl.push(HistoricoPage, { time : time.nome, rodada_id : this.destaque_rodada_id });
  }

  destaques(){
    let modal = this.ModalController.create(ModalDestaquePage, this.liga.times);
    modal.present();
  }

  filtrar(filtro){    
    this.liga.times.sort((a, b) => a.ranking[filtro] - b.ranking[filtro]);
  }

  ionViewDidLoad() { 
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

     this.http.getApi('auth/liga/' + localStorage.getItem('liga_padrao')).subscribe(response => {
      this.liga = response;      
      this.navegaroff.setItem('home_liga', response);
      loading.dismiss();
    }, err => {
      loading.dismiss();
      this.liga = this.ligaoff;
    })    
  }

}

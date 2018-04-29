import { MyApp } from './../../app/app.component';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { ModalController, PopoverController } from 'ionic-angular';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';

import { HistoricoPage } from '../historico/historico';
import { PartidasPage } from '../partidas/partidas';
import { PontuacaoComponent } from '../../components/pontuacao/pontuacao';
import { ConfigPage } from '../config/config';
import { ClassificacaoPage } from '../classificacao/classificacao';
import { ModalDestaquePage } from '../modal-destaque/modal-destaque';
import { MeuTimePage } from './../meu-time/meu-time';
import { NacionalPage } from './../nacional/nacional';
import { PremiacaoPage } from '../premiacao/premiacao';
import { RegulamentoPage } from '../regulamento/regulamento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  liga;  
  ligaoff:object; 
  filtro:String;
  rodada_atual;
  backbutton;
  esconderScroll;

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
    modal.onDidDismiss(() => { 
      if(localStorage.getItem('liga_padrao') == 'campeoes-agrestina')
      {
        let existe = MyApp.pages.some(e => e.title == 'Premiação');
        if(!existe) MyApp.pages.push({ title: 'Premiação', component: PremiacaoPage }, { title: 'Regulamento', component: RegulamentoPage });
      }
      else
      {
        MyApp.pages.splice(5, 2);
      }
      this.ionViewDidLoad();
    });
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

  meu_time(){
    let modal = this.ModalController.create(MeuTimePage);
    modal.present();
  }

  filtrar(filtro){    
    this.liga.times.sort((a, b) => a.ranking[filtro] - b.ranking[filtro]);
  }

  ionViewDidLoad() { 
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('auth/liga/' + localStorage.getItem('liga_padrao') + '?orderBy=campeonato').subscribe(response => {
    let resposta = JSON.parse(JSON.stringify(response));

    for(let x in resposta.times)
    {
      let r = resposta.times[x].ranking;

      r.campeonato = (r.campeonato || (resposta.times.length)) 
      r.rodada = (r.rodada || (resposta.times.length)) 
      r.patrimonio = (r.patrimonio || (resposta.times.length)) 
      r.mes = (r.mes || (resposta.times.length)) 
      r.turno = (r.turno || (resposta.times.length)) 
    }
    this.liga = resposta;      
    this.navegaroff.setItem('home_liga', resposta);
    loading.dismiss();
    this.http.getApi('partidas').subscribe(response => {
      this.rodada_atual = response;
    })
    }, err => {
      loading.dismiss();
      this.liga = this.ligaoff;
    })       
  }  
  
  carregarMais($event){ 
      let page = this.liga.times.length / 100 + 1;
      this.esconderScroll = (this.liga.liga.total_times_liga - this.liga.times.length) ? false : true;
      if((this.liga.liga.total_times_liga - this.liga.times.length) >= 0){ 
        this.http.getApi('auth/liga/' + localStorage.getItem('liga_padrao') + '?orderBy=' + this.filtro + '&page=' + page).subscribe(response => {
          let resposta = JSON.parse(JSON.stringify(response));
      
          for(let x in resposta.times)
          {
            let r = resposta.times[x].ranking;
      
            r.campeonato = (r.campeonato || (resposta.times.length)) 
            r.rodada = (r.rodada || (resposta.times.length)) 
            r.patrimonio = (r.patrimonio || (resposta.times.length)) 
            r.mes = (r.mes || (resposta.times.length)) 
            r.turno = (r.turno || (resposta.times.length))
            
            this.liga.times.push(resposta.times[x]);
          }
                
          $event.complete();
          }, err => {
            $event.complete();
          })
        }
      else
      {
        $event.complete();
      }
    
  }
}

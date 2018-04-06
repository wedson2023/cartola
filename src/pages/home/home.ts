import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { HistoricoPage } from '../historico/historico';
import { PartidasPage } from '../partidas/partidas';
import { HttpProvider } from '../../providers/http/http';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  liga:object;
  ligaoff:object;
  times;
  ranking:String;
  filtro:String = 'campeonato';

  destaque_lanterninha_time:String;
  destaque_lanterninha_escudo:String;
  destaque_lanterninha_nome:String;
  destaque_lanterninha_id:String;
  destaque_lanterninha_pontos:String;

  destaque_mes_time:String;
  destaque_mes_escudo:String;
  destaque_mes_nome:String;
  destaque_mes_id:String;
  destaque_mes_pontos:String;

  destaque_patrimonio_time:String;
  destaque_patrimonio_escudo:String;
  destaque_patrimonio_nome:String;
  destaque_patrimonio_id:String;
  destaque_patrimonio_pontos:String;

  destaque_rodada_time:String;
  destaque_rodada_escudo:String;
  destaque_rodada_nome:String;
  destaque_rodada_id:String;
  destaque_rodada_pontos:String;

  destaque_turno_time:String;
  destaque_turno_escudo:String;
  destaque_turno_nome:String;
  destaque_turno_id:String;
  destaque_turno_pontos:String;

  constructor(
    public navCtrl: NavController,
    public HttpClient: HttpClient,
    public loadingCtrl: LoadingController,
    public ModalController: ModalController,
    private http:HttpProvider,
    private navegaroff: NavegaroffProvider
  )   
  {
    this.ligaoff = this.navegaroff.getItem('home_liga');
  }

  abrePartidas(){
    this.http.getApi('partidas').subscribe(response => {
        let modal = this.ModalController.create(PartidasPage, { data : response });
        modal.present();
    })   
   
  }

  historico(time){
    this.navCtrl.push(HistoricoPage, { time : time.nome, rodada_id : this.destaque_rodada_id });
  }

  selecionaFiltrar(filtro){
    if(filtro === 'campeonato')
    {
      this.times.sort(function(a, b){ return a.ranking.campeonato - b.ranking.campeonato });
    } else if(filtro === 'rodada')
    {
      this.times.sort(function(a, b){ return a.ranking.rodada - b.ranking.rodada });
    } else if(filtro === 'patrimonio')
    {
      this.times.sort(function(a, b){ return a.ranking.patrimonio - b.ranking.patrimonio });
    } else if(filtro === 'mes')
    {
      this.times.sort(function(a, b){ return a.ranking.mes - b.ranking.mes });
    } else if(filtro === 'turno')
    {
      this.times.sort(function(a, b){ return a.ranking.turno - b.ranking.turno });
    }
  }

  abreModalDestaque(){
    let data = {
      lanterninha : {
        time : this.destaque_lanterninha_time,
        escudo : this.destaque_lanterninha_escudo,
        nome : this.destaque_lanterninha_nome,
        rodada_id : this.destaque_lanterninha_id,
        pontos : this.destaque_lanterninha_pontos
      },
      mes : {
        time : this.destaque_mes_time,
        escudo : this.destaque_mes_escudo,
        nome : this.destaque_mes_nome,
        rodada_id : this.destaque_mes_id,
        pontos : this.destaque_mes_pontos
      },
      patrimonio : {
        time : this.destaque_patrimonio_time,
        escudo : this.destaque_patrimonio_escudo,
        nome : this.destaque_patrimonio_nome,
        rodada_id : this.destaque_patrimonio_id,
        pontos : this.destaque_patrimonio_pontos
      },
      rodada : {
        time : this.destaque_rodada_time,
        escudo : this.destaque_rodada_escudo,
        nome : this.destaque_rodada_nome,
        rodada_id : this.destaque_rodada_id,
        pontos : this.destaque_rodada_pontos
      },
      turno : {
        time : this.destaque_turno_time,
        escudo : this.destaque_turno_escudo,
        nome : this.destaque_turno_nome,
        rodada_id : this.destaque_turno_id,
        pontos : this.destaque_turno_pontos
      }
    } 

    let modal = this.ModalController.create('ModalDestaquePage', { data : data });
    modal.present();
  }

  ionViewDidLoad() { 
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

     this.http.getApi('auth/liga/campeoes-agrestina').subscribe(response => {
      this.liga = response;
      
      this.navegaroff.setItem('home_liga', response);
      
      //if(response.destaques !== undefined)
      //{
      //   this.destaque_lanterninha_time = resposta.destaques.lanterninha.nome;
      //   this.destaque_lanterninha_nome = resposta.destaques.lanterninha.nome_cartola;       
      //   this.destaque_lanterninha_escudo = resposta.destaques.lanterninha.url_escudo_png; 
      //   this.destaque_lanterninha_id = resposta.destaques.lanterninha.rodada_time_id;

      //   this.destaque_mes_time = resposta.destaques.mes.nome;
      //   this.destaque_mes_nome = resposta.destaques.mes.nome_cartola;       
      //   this.destaque_mes_escudo = resposta.destaques.mes.url_escudo_png; 
      //   this.destaque_mes_id = resposta.destaques.mes.rodada_time_id;

      //   this.destaque_patrimonio_time = resposta.destaques.patrimonio.nome;
      //   this.destaque_patrimonio_nome = resposta.destaques.patrimonio.nome_cartola;       
      //   this.destaque_patrimonio_escudo = resposta.destaques.patrimonio.url_escudo_png; 
      //   this.destaque_patrimonio_id = resposta.destaques.patrimonio.rodada_time_id;

      //   this.destaque_rodada_time = resposta.destaques.rodada.nome;
      //   this.destaque_rodada_nome = resposta.destaques.rodada.nome_cartola;       
      //   this.destaque_rodada_escudo = resposta.destaques.rodada.url_escudo_png; 
      //   this.destaque_rodada_id = resposta.destaques.rodada.rodada_time_id;

      //   this.destaque_turno_time = resposta.destaques.turno.nome;
      //   this.destaque_turno_nome = resposta.destaques.turno.nome_cartola;       
      //   this.destaque_turno_escudo = resposta.destaques.turno.url_escudo_png; 
      //   this.destaque_turno_id = resposta.destaques.turno.rodada_time_id;

      //   for(let x in resposta.times)
      //   {
      //     if(resposta.times[x].time_id == resposta.destaques.lanterninha.time_id)
      //     {          
      //       this.destaque_lanterninha_pontos = resposta.times[x].pontos.rodada;
      //     }
          
      //     if(resposta.times[x].time_id == resposta.destaques.patrimonio.time_id)
      //     {
      //       this.destaque_patrimonio_pontos = resposta.times[x].patrimonio;
      //     }
          
      //     if(resposta.times[x].time_id == resposta.destaques.mes.time_id)
      //     {
      //       this.destaque_mes_pontos = resposta.times[x].pontos.mes;
      //     }

      //     if(resposta.times[x].time_id == resposta.destaques.rodada.time_id)
      //     {
      //       this.destaque_rodada_pontos = resposta.times[x].pontos.rodada;
      //     }

      //     if(resposta.times[x].time_id == resposta.destaques.turno.time_id)
      //     {
      //       this.destaque_turno_pontos = resposta.times[x].pontos.turno;
      //     }
      //   }
     // }

      loading.dismiss();
    }, err => {
      loading.dismiss();
      this.liga = this.ligaoff;
    })    
  }

}

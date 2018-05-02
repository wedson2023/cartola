import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { HistoricoPage } from '../historico/historico';

@IonicPage()
@Component({
  selector: 'page-modal-destaque',
  templateUrl: 'modal-destaque.html',
})
export class ModalDestaquePage {

  liga;
  destaques:any = {};
  rodada_atual:Number;

  constructor( 
    private navParams: NavParams,
    private ModalController: ModalController,
    private http: HttpProvider,
    private loadingCtrl: LoadingController
  ) 
  { 
    this.liga = JSON.parse(JSON.stringify(this.navParams.get('liga')));
    this.rodada_atual = this.navParams.get('rodada_atual'); 
  }

  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('time/slug/' + this.liga.destaques.rodada.slug + '/' + this.rodada_atual).subscribe(response => {
      this.destaques.pontuador = { nome : response['time'].nome, nome_cartola : response['time'].nome_cartola, foto_perfil : response['time'].foto_perfil, slug : response['time'].slug,  pontos : response['pontos'] } 
      
      this.http.getApi('time/slug/' + this.liga.destaques.lanterninha.slug + '/' + this.rodada_atual).subscribe(response => {
        this.destaques.lanterninha = { nome : response['time'].nome, nome_cartola : response['time'].nome_cartola, foto_perfil : response['time'].foto_perfil, slug : response['time'].slug,  pontos : response['pontos'] } 
        loading.dismiss();

        this.http.getApi('time/slug/' + this.liga.destaques.patrimonio.slug + '/' + this.rodada_atual).subscribe(response => {
          let patrimonio = (this.liga.times.filter(e => e.time_id == response['time'].time_id)[0] || 0);
          this.destaques.patrimonio = { nome : response['time'].nome, nome_cartola : response['time'].nome_cartola, foto_perfil : response['time'].foto_perfil, slug : response['time'].slug,  patrimonio : patrimonio.patrimonio } 

          let mes = this.liga.times.sort((a,b) => (a.ranking.mes > b.ranking.mes) ? 1 : ((a.ranking.mes < b.ranking.mes) ? -1 : 0))[0];
          this.destaques.mes = { nome : mes.nome, nome_cartola : mes.nome_cartola, foto_perfil : mes.foto_perfil, slug : mes.slug,  pontos : mes.pontos.mes }

          let turno = this.liga.times.sort((a,b) => (a.ranking.turno > b.ranking.turno) ? 1 : ((a.ranking.turno < b.ranking.turno) ? -1 : 0))[0];
          this.destaques.turno = { nome : turno.nome, nome_cartola : turno.nome_cartola, foto_perfil : turno.foto_perfil, slug : turno.slug,  pontos : turno.pontos.turno } 

          let campeonato = this.liga.times.sort((a,b) => (a.ranking.campeonato > b.ranking.campeonato) ? 1 : ((a.ranking.campeonato < b.ranking.campeonato) ? -1 : 0))[0];
          this.destaques.campeonato = { nome : campeonato.nome, nome_cartola : campeonato.nome_cartola, foto_perfil : campeonato.foto_perfil, slug : campeonato.slug,  pontos : campeonato.pontos.campeonato }

        })
      })
    })
  }

  historico(time){
    let modal = this.ModalController.create(HistoricoPage, { time : { slug : time }, rodada_atual : this.rodada_atual });
    modal.present();
  }
}

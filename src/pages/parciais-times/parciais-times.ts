import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';
import { ModalParciaisTimePage } from './../modal-parciais-time/modal-parciais-time';

@IonicPage()
@Component({
  selector: 'page-parciais-times',
  templateUrl: 'parciais-times.html',
})
export class ParciaisTimesPage {
  private liga;
  private last_updated;
  private times;
  private timesoff;
  private atletas;

  constructor(
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider,
    private ModalController: ModalController
  ) {    
    this.liga = this.navegaroff.getItem('home_liga');
    this.timesoff = this.navegaroff.getItem('hr_parciais_times');
  }

  parcial_time(time){
    //console.log(time, this.atletas);
    let modal = this.ModalController.create(ModalParciaisTimePage, { time : time, atletas : this.atletas });
    modal.present();
  }

  carregar(refresh){
    this.ionViewDidLoad(refresh);
  }

  ionViewDidLoad(refresh) {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    if(!refresh) loading.present();

    this.http.getApi('liga/' + this.liga.liga.liga_id + '/times').subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));
      this.http.getApi('atletas/pontuados').subscribe(atletas => {
        this.times = [];        
        this.atletas = JSON.parse(JSON.stringify(atletas));
        for(let x in resposta)
        {
          let times = this.liga.times.filter(e => e.time_id == x)[0];
          times.rodada = this.atletas.rodada;
          times.pontuacao = 0;
          times.atletas_restante = 0;
          times.atleta = [];
          for(let i in resposta[x].atletas)
          {
            times.pontuacao += (this.atletas.atletas[resposta[x].atletas[i]] === undefined ? 0 : this.atletas.atletas[resposta[x].atletas[i]].pontuacao); 
            times.atletas_restante += (this.atletas.atletas[resposta[x].atletas[i]] === undefined ? 0 : 1 );
            times.atleta.push(this.atletas.atletas[resposta[x].atletas[i]]);
          }
          times.pontuacao_total = times.pontuacao + times.pontos.campeonato;
          this.times.push(times);
        } 

        this.navegaroff.setItem('hr_parciais_times', new Date());
        this.navegaroff.setItem('parciais_times', this.times);
        this.times.sort((a,b) => a.pontuacao > b.pontuacao ? -1 : 1);
        this.last_updated = new Date();
        if(refresh) refresh.complete();
        loading.dismiss();     
      }) 
    }, err => {
      this.last_updated = this.navegaroff.getItem('hr_parciais_times');
      this.times = this.timesoff;
      if(refresh) refresh.complete();
      loading.dismiss();
    })
  }

}

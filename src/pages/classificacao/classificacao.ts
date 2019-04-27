import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-classificacao',
  templateUrl: 'classificacao.html',
})
export class ClassificacaoPage {
  timesoff;
  times;

  constructor(    
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private navegaroff: NavegaroffProvider
  ) {
    this.timesoff = this.navegaroff.getItem('classificacao');
  }

  ionViewDidLoad() { 
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

     this.http.get('http://104.236.95.250:3000/').subscribe(response => {
      this.times = response;      
      this.navegaroff.setItem('classificacao', response);
      loading.dismiss();
    }, err => {
      loading.dismiss();
      this.times = this.timesoff;
    })    
  }

}

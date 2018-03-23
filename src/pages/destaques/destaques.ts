import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-destaques',
  templateUrl: 'destaques.html',
})
export class DestaquesPage {

  atletas;

  constructor(
    public navCtrl: NavController,
    public HttpClient: HttpClient,
    public loadingCtrl: LoadingController
  )   
  {
    
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    this.HttpClient.get('http://wedsonwebdesigner.com.br/cartola/index.php?api=destaques').subscribe(response => {
      this.atletas = JSON.parse(JSON.stringify(response));
      loading.dismiss();
    })
  }

}

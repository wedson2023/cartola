import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-destaques',
  templateUrl: 'destaques.html',
})
export class DestaquesPage {

  atletas;

  constructor(
    private http: HttpProvider,
    public loadingCtrl: LoadingController
  )   
  {
    
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    this.http.getApi('mercado/destaques').subscribe(response => {
      this.atletas = JSON.parse(JSON.stringify(response));
      loading.dismiss();
    })
  }

}

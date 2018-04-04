import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-premiacao',
  templateUrl: 'premiacao.html',
})
export class PremiacaoPage {

  public premiacao:object;
  public outros:object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.get('http://wedsonwebdesigner.com.br/cartola/premiacao.php').subscribe(response => {
       console.log(response);
      this.premiacao = response[0];
      this.outros = response[1];
      loading.dismiss();
    });
  }

}

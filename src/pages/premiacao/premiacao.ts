import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';

@IonicPage()
@Component({
  selector: 'page-premiacao',
  templateUrl: 'premiacao.html',
})
export class PremiacaoPage {

  public premiacao:object;
  public premiacaooff:object;
  public outros:object;

  constructor(
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider
  ) 
  {
    this.premiacaooff = this.navegaroff.getItem('premiacao');
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.get('http://wedsonwebdesigner.com.br/cartola/premiacao.php').subscribe(response => {
      this.navegaroff.setItem('premiacao', response);       
      this.premiacao = response[0];
      this.outros = response[1];
      loading.dismiss();
    }, err => {
      this.premiacao = this.premiacaooff[0];
      this.outros = this.premiacaooff[1];
      loading.dismiss();
    });
  }

}

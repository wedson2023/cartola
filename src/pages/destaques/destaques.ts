import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';

@IonicPage()
@Component({
  selector: 'page-destaques',
  templateUrl: 'destaques.html',
})
export class DestaquesPage {

  public atletas:object;
  public atletasoff:object;

  constructor(
    private http: HttpProvider,
    public loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider
  )   
  {
    this.atletasoff = this.navegaroff.getItem('destaques');
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    this.http.getApi('mercado/destaques').subscribe(response => {
      this.atletas = response;
      this.navegaroff.setItem('destaques', response);
      loading.dismiss();
    }, err => {
      this.atletas = this.atletasoff;
      loading.dismiss();
    })
  }

}

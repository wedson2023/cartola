import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-parciais-ligas',
  templateUrl: 'parciais-ligas.html',
})
export class ParciaisLigasPage {

  ligas:any = {
    classicas : [],
    mata_mata : []
  };

  ligasoff;

  constructor(
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider
  ) {
    this.ligasoff = navegaroff.getItem('parciais_atletas');
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    this.http.getApi('auth/ligas').subscribe(response => {
      response;
      for(let x in response['ligas'])
      {
        if(response['ligas'][x].tipo == 'M' && !response['ligas'][x].mata_mata)
        {
          this.ligas.classicas.push(response['ligas'][x]);
        }
        else if (response['ligas'][x].mata_mata)
        {
          this.ligas.mata_mata.push(response['ligas'][x]);
        }
      }
      this.navegaroff.setItem('parciais_ligas', this.ligas);
      loading.dismiss();
    }, err => {
      loading.dismiss();
      this.ligas = this.ligasoff;
    });
  }

}

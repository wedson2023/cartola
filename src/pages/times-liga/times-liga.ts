import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


@IonicPage()
@Component({
  selector: 'page-times-liga',
  templateUrl: 'times-liga.html',
})
export class TimesLigaPage {

  slug:string;
  times;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    private loadingCtrl: LoadingController
  ) {
    this.slug = this.navParams.get('data');
    console.log(this.navParams.get('data'));
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    this.http.getApi('auth/liga/' + this.slug).subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));      
      this.times = resposta.times.sort(function(a, b){ return a.ranking.campeonato - b.ranking.campeonato });
      loading.dismiss(); 
    }, (err) => {
      loading.dismiss(); 
      console.log('Verifique sua conexão com a internet');
    });
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-times',
  templateUrl: 'times.html',
})
export class TimesPage {  

  times;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http:HttpProvider,
    private loadingCtrl:LoadingController
  ) 
  {
  }

  pesquisar(key, time){
    if(key.which === 13 && time !== undefined && time !== '')
    {
      let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
      loading.present();
      let nome_time = encodeURIComponent(time);
      this.http.getApi('times?q=' + encodeURIComponent(nome_time)).subscribe(response => {
        loading.dismiss(); 
        this.times = response; 
      }, (err) => {
        loading.dismiss(); 
        console.log('Verifique sua conexão com a internet');
      });
    }    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimesPage');
  }

}

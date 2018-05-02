import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
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
    public navParams: NavParams,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private mensagem: MensagemProvider
  ) {
    this.slug = this.navParams.get('data');
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();
    this.http.getApi('auth/liga/' + this.slug).subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response)); 
       
      for(let x in resposta.times)
      {
        let r = resposta.times[x].ranking;
  
        r.campeonato = (r.campeonato || (resposta.times.length)) 
        r.rodada = (r.rodada || (resposta.times.length)) 
        r.patrimonio = (r.patrimonio || (resposta.times.length)) 
        r.mes = (r.mes || (resposta.times.length)) 
        r.turno = (r.turno || (resposta.times.length)) 
      }

      this.times = resposta.times.sort(function(a, b){ return a.ranking.campeonato - b.ranking.campeonato });
      loading.dismiss(); 
    }, (err) => {
      loading.dismiss();
      this.viewCtrl.dismiss();
      this.mensagem.mensagem('Algo deu errado', 'Verifique sua conexão com a internet');
    });
  }

}

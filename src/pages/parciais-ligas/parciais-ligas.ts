import { ParciaisTimesPage } from './../parciais-times/parciais-times';
import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController } from 'ionic-angular';


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
    private navegaroff: NavegaroffProvider,
    private mensagem: MensagemProvider,
    private ModalController: ModalController
  ) {
    this.ligasoff = navegaroff.getItem('parciais_atletas');
  }

  abrir_liga_classica(liga_id, participantes){
    console.log(liga_id, participantes);
    if(participantes > 100)
    {
      this.mensagem.mensagem('Atenção', 'Descupe-nos só esta disponível ligas com a até 100 times, próxima versão estaremos trabalhando nisso.');
    }
    else
    {
      let modal = this.ModalController.create(ParciaisTimesPage, { liga_id : liga_id });
      modal.present();
    }
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

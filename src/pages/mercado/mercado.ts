import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mercado',
  templateUrl: 'mercado.html',
})
export class MercadoPage {

  public atletas:object;
  private response;

  constructor(private HttpClient: HttpClient, private LoadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.LoadingController.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.HttpClient.get('http://wedsonwebdesigner.com.br/cartola/index.php?api=mercado').subscribe(response => {
        this.atletas = response.atletas;
        for(let atleta of response.atletas)
        {
          atleta.clube = response.clubes[atleta.clube_id];
          atleta.posicao = response.posicoes[atleta.posicao_id];
        }
        console.log(this.atletas);
        loading.dismiss();
    }) 
  }

}

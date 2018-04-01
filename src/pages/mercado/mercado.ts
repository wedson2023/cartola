import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-mercado',
  templateUrl: 'mercado.html',
})
export class MercadoPage {

  public atletas;

  constructor(
    private http: HttpProvider,
    private LoadingController: LoadingController
  ) 
  {
  }

  ionViewDidLoad() {
    let loading = this.LoadingController.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('atletas/mercado').subscribe(response => {
        let resposta = JSON.parse(JSON.stringify(response));
        
        this.atletas = resposta.atletas.sort((a,b) => a.preco_num > b.preco_num ? -1 : 1);
        for(let atleta of resposta.atletas)
        {
          atleta.clube = resposta.clubes[atleta.clube_id];
          atleta.posicao = resposta.posicoes[atleta.posicao_id];
        }
        console.log(this.atletas);
        loading.dismiss();
    }) 
  }

}

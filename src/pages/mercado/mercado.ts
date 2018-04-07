import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';

@IonicPage()
@Component({
  selector: 'page-mercado',
  templateUrl: 'mercado.html',
})
export class MercadoPage {

  public atletas:object;
  private atletasoff:object;

  constructor(
    private http: HttpProvider,
    private LoadingController: LoadingController,
    private navegaroff: NavegaroffProvider
  ) 
  {
    this.atletasoff = this.navegaroff.getItem('mercado');
  }

  abrir_scouts(atleta){
    console.log(atleta);
    atleta.abrir_scouts = true;
  }

  ionViewDidLoad() {
    let loading = this.LoadingController.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('partidas').subscribe(response => {
      let partidas = JSON.parse(JSON.stringify(response));

      this.http.getApi('atletas/mercado').subscribe(response => {
          let resposta = JSON.parse(JSON.stringify(response));
          
          this.atletas = resposta.atletas.sort((a,b) => a.preco_num > b.preco_num ? -1 : 1);
          for(let atleta of resposta.atletas)
          {
            atleta.clube = resposta.clubes[atleta.clube_id];
            atleta.posicao = resposta.posicoes[atleta.posicao_id];
            let confronto = partidas.partidas.filter(e => e.clube_casa_id == atleta.clube_id || e.clube_visitante_id == atleta.clube_id)[0];
            atleta.confronto = { url_escudo_casa : resposta.clubes[confronto.clube_casa_id].escudos['30x30'], url_escudo_visitante : resposta.clubes[confronto.clube_visitante_id].escudos['30x30'] };
          }
          this.navegaroff.setItem('mercado', this.atletas);
          loading.dismiss();
      }) 

    }, err =>{
      this.atletas = this.atletasoff;
      loading.dismiss();
    })
  }

}

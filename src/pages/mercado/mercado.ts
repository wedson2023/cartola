import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';
import { MercadoComponent } from '../../components/mercado/mercado';

@IonicPage()
@Component({
  selector: 'page-mercado',
  templateUrl: 'mercado.html',
})
export class MercadoPage {

  private todos_atletas:object;
  public atletas:object;
  private atletasoff:object;

  constructor(
    private http: HttpProvider,
    private LoadingController: LoadingController,
    private navegaroff: NavegaroffProvider,
    private popoverCtrl: PopoverController
  ) 
  {
    this.atletasoff = this.navegaroff.getItem('mercado');
  }

  abrir_scouts(atleta){
    atleta.abrir_scouts = true;
  }

  abrir_filtro(){   
    let popover = this.popoverCtrl.create(MercadoComponent, this.atletasoff, { cssClass: 'mercado' });
    popover.present();

    popover.onDidDismiss(atletas => this.atletas = atletas);
  }

  ionViewDidLoad() {
    let loading = this.LoadingController.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApi('partidas').subscribe(response => {
      let partidas = JSON.parse(JSON.stringify(response));

      this.http.getApi('atletas/mercado').subscribe(response => {
          let resposta = JSON.parse(JSON.stringify(response));

          let atletas = resposta.atletas.filter(elemento => elemento.status_id != 6);
          
          this.atletas = atletas.sort((a,b) => a.preco_num > b.preco_num ? -1 : 1);
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

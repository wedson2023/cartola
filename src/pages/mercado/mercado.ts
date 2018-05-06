declare var $ :any;

import { Component, OnInit } from '@angular/core';
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

export class MercadoPage implements OnInit{

  public atletas;
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

  ngOnInit(){

    $('#list').click(function(){
      $('ion-select.list').trigger('click');
    })

    $('#stats').click(function(){
      $('ion-select.stats').trigger('click');
    })

  }

  estatisticas(ordem){    
    this.atletas.sort((a, b) => ((a.scout[ordem] || 0) > (b.scout[ordem] || 0)) ? -1 : ((a.scout[ordem] || 0) < (b.scout[ordem] || 0)) ? 1 : 0);
  }

  ordenar(ordem){
    this.atletas.sort((a, b) => {
     if(ordem == 'desvariacao_num')
     {        
        return (a['variacao_num'] > b['variacao_num']) ? 1 : ((a['variacao_num'] < b['variacao_num']) ? -1 : 0);
      }
      else if(ordem == 'apelido')
      {
        return (a[ordem] > b[ordem]) ? 1 : ((a[ordem] < b[ordem]) ? -1 : 0);
      }
      else
      {               
        return (a[ordem] > b[ordem]) ? -1 : ((a[ordem] < b[ordem]) ? 1 : 0);
      }
    });
  }

  abrir_scouts(atleta){
    atleta.abrir_scouts = true;
  }

  abrir_filtro(){   
    let popover = this.popoverCtrl.create(MercadoComponent, this.atletasoff, { cssClass: 'mercado' });
    popover.present();
    popover.onDidDismiss(atletas => this.atletas = ( atletas || this.atletas ));
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
            atleta.scout = atleta.scout && Object.keys(atleta.scout).length ? atleta.scout : {};
            atleta.scout['G'] = (atleta.scout['G'] || 0);
            atleta.scout['A'] = (atleta.scout['A'] || 0);
            atleta.scout['FT'] = (atleta.scout['FT'] || 0);
            atleta.scout['FF'] = (atleta.scout['FF'] || 0);
            atleta.scout['FS'] = (atleta.scout['FS'] || 0);
            atleta.scout['PP'] = (atleta.scout['PP'] || 0);
            atleta.scout['FD'] = (atleta.scout['FD'] || 0);
            atleta.scout['I'] = (atleta.scout['I'] || 0);
            atleta.scout['PE'] = (atleta.scout['PE'] || 0);
            atleta.scout['SG'] = (atleta.scout['SG'] || 0);
            atleta.scout['DP'] = (atleta.scout['DP'] || 0);
            atleta.scout['DD'] = (atleta.scout['DD'] || 0);
            atleta.scout['RB'] = (atleta.scout['RB'] || 0);
            atleta.scout['GC'] = (atleta.scout['GC'] || 0);
            atleta.scout['CV'] = (atleta.scout['CV'] || 0);
            atleta.scout['CA'] = (atleta.scout['CA'] || 0);
            atleta.scout['GS'] = (atleta.scout['GS'] || 0);
            atleta.scout['FC'] = (atleta.scout['FC'] || 0);
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

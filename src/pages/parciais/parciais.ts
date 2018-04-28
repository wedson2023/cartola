declare var $ :any;

import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ParciaisTimesPage } from '../parciais-times/parciais-times';
import { ParciaisJogadoresPage } from '../parciais-jogadores/parciais-jogadores';
import { ParciaisClubesPage } from '../parciais-clubes/parciais-clubes';

@IonicPage()
@Component({
  selector: 'page-parciais',
  templateUrl: 'parciais.html',
})
export class ParciaisPage{

  private liga;
  private timesoff;
  private times;
  private atletas;
  private last_updated;

  tab1 = ParciaisTimesPage;
  tab2 = ParciaisJogadoresPage;
  tab3 = ParciaisClubesPage;

  constructor(
    private http: HttpProvider,
    private navegaroff: NavegaroffProvider,
    private socialSharing: SocialSharing,
    private Mensagem: MensagemProvider
  ) {
    this.liga = this.navegaroff.getItem('home_liga');
    this.timesoff = this.navegaroff.getItem('parciais_times');
  }

  ngOnInit(){
    $('#share').click(function(){
      $('ion-select.parciais').trigger('click');
    })
  }

  compartilhar_texto(response, ordem){
    let quebra = '\n';
    let text = '*:::: ' + this.liga.liga.nome.toUpperCase() + ' ::::*' + quebra + quebra;
    
    if(ordem == 'true')
    {
      text += '*_RANKING PARCIAIS_*' + quebra + quebra;
      response.sort((a,b) => a.pontuacao > b.pontuacao ? -1 : 1);
    }
    else
    {   
      text += '*_RANKING GERAL_*' + quebra + quebra;   
      response.sort((a,b) => a.pontuacao_total > b.pontuacao_total ? -1 : 1);          
    }

    for(let x in response)
    {
      let i = (parseInt(response[x].pontuacao_total.toString().indexOf('.')) + 3);
      let pontuacao = (ordem == 'true' ? response[x].pontuacao : response[x].pontuacao_total);
      text += '*' + (parseInt(x) + 1) + 'º* ' + response[x].nome.toString().substr(0, 10) + ' *' + pontuacao.toString().substr(0, i) + '* ' + response[x].atletas_restante + '/12' + quebra;
    } 

    let ultima = new Date(this.last_updated); 
    text += quebra + '_Última atualização: ' + new Date(ultima.setHours(ultima.getHours() + 3)).toLocaleTimeString('pt-BR') + '_';

    this.socialSharing.shareViaWhatsApp(text, null, '').then(() => {
      // Success!
    }).catch(() => {
      this.Mensagem.mensagem('Algo deu errado', 'Tente novamente!');
    });
  }

  compartilhar(ordem){
    this.http.getApi('liga/' + this.liga.liga.liga_id + '/times').subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));
      this.http.getApi('atletas/pontuados').subscribe(atletas => {
        this.times = [];        
        this.atletas = JSON.parse(JSON.stringify(atletas));
        for(let x in resposta)
        {
          let times = this.liga.times.filter(e => e.time_id == x)[0];
          times.rodada = this.atletas.rodada;
          times.pontuacao = 0;
          times.atletas_restante = 0;
          times.atleta = [];
          for(let i in resposta[x].atletas)
          {
            times.pontuacao += (this.atletas.atletas[resposta[x].atletas[i]] === undefined ? 0 : this.atletas.atletas[resposta[x].atletas[i]].pontuacao); 
            times.atletas_restante += (this.atletas.atletas[resposta[x].atletas[i]] === undefined ? 0 : 1 );
            times.atleta.push(this.atletas.atletas[resposta[x].atletas[i]]);
          }
          times.pontuacao_total = times.pontuacao + times.pontos.campeonato;
          this.times.push(times);
        } 

        this.navegaroff.setItem('hr_parciais_times', new Date());
        this.navegaroff.setItem('parciais_times', this.times);
        this.times.sort((a,b) => a.pontuacao > b.pontuacao ? -1 : 1);
        this.last_updated = new Date();

        this.compartilhar_texto(this.times, ordem);
      }) 
    }, err => {
      this.last_updated = this.navegaroff.getItem('hr_parciais_times');
      if(+this.timesoff)
      {
        this.compartilhar_texto(this.timesoff, ordem);
      }
      else
      {
        this.Mensagem.mensagem('Algo deu errado', 'Verifique sua conexão ou aguarde enquanto as parciais ficam disponiveis.');
      }
      this.times = this.timesoff;
    })
  }

  ionViewDidLoad() {
    
  }

}

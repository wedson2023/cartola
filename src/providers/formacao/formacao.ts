import { Injectable } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import { NavegaroffProvider } from '../navegaroff/navegaroff';
import { MercadoPage } from '../../pages/mercado/mercado';

@Injectable()
export class FormacaoProvider {

  private posicao_id;
  private time_salvo;
  private time_dados;

  constructor(
    private alertCtrl: AlertController,
    private navegaroff: NavegaroffProvider,
    private ModalController: ModalController
  ) {
    this.time_salvo = this.navegaroff.getItem('time_salvo');
    let escalacao = this.meuEsquema(this.time_salvo)['timeCompleto']

    this.time_dados = {      
      escalacao : escalacao,
      valor_time : this.time_salvo.valor_time,
      patrimonio : this.time_salvo.patrimonio,
      criar_time : true
    };
  }

  getEscalacao(){
    return this.time_dados.escalacao;
  }

  getClubes(){
    return this.time_salvo.clubes;
  }

  selecionaAtleta(atleta, posicao_id, mudouTime){
    this.posicao_id = { 1 : 'goleiro', 2 : 'lateral', 3 : 'zagueiro', 4 : 'meio', 5 : 'ataque', 6 : 'tecnico' };
    var posicao = this.time_dados.escalacao[this.posicao_id[posicao_id]];
    if(atleta){
      posicao[posicao.indexOf(atleta)] = null;
      this.time_dados.valor_time -= atleta.preco_num; 
      mudouTime.emit(this.time_dados);
    }
    else
    {
      this.time_dados.posicao = this.posicao_id[posicao_id];
      this.time_dados.posicao_id = posicao_id;

      let modal = this.ModalController.create(MercadoPage, { time_dados : this.time_dados });
      modal.present();
      modal.onDidDismiss(() => {
        this.time_dados.escalacao = this.time_dados.escalacao;                       
        mudouTime.emit(this.time_dados);
      })
    }
  }

  venderTime(vender, mudouTime){
    let alerta = this.alertCtrl.create({
      title : 'Confirme por favor',
      message : 'Tem certeza que deseja vender todo o time?',
      buttons : [
        {
          text : 'Não',
          role : 'cancel',
          handler : () => {
            vender = false;
          }
        },
        {
          text : 'Sim',
          handler: () => {
            this.time_dados.valor_time = 0,
            this.time_dados.patrimonio = this.time_salvo.patrimonio,

            this.time_dados.escalacao = this.meuEsquema(this.time_salvo)['timeVazio'];

            mudouTime.emit(this.time_dados);
            vender = false;
          }
        }
      ]
    });
    alerta.present();

    return alerta;
  };

  meuEsquema(time_salvo){

    let comLateral = {
      ataque : time_salvo.atletas.filter(e => e.posicao_id === 5),
      meio : time_salvo.atletas.filter(e => e.posicao_id === 4),
      zagueiro : time_salvo.atletas.filter(e => e.posicao_id === 3),
      lateral : time_salvo.atletas.filter(e => e.posicao_id === 2),
      goleiro : time_salvo.atletas.filter(e => e.posicao_id === 1),
      tecnico : time_salvo.atletas.filter(e => e.posicao_id === 6)
    }

    let semLateral = {
      ataque : time_salvo.atletas.filter(e => e.posicao_id === 5),
      meio : time_salvo.atletas.filter(e => e.posicao_id === 4),
      zagueiro : time_salvo.atletas.filter(e => e.posicao_id === 3),
      goleiro : time_salvo.atletas.filter(e => e.posicao_id === 1),
      tecnico : time_salvo.atletas.filter(e => e.posicao_id === 6)
    }

    if(time_salvo.esquema_id == 1)
    {      
      return {
        timeCompleto : semLateral,
        timeVazio : {
          ataque : [null, null, null],
          meio : [null, null, null, null],
          zagueiro : [null, null, null],
          goleiro : [null],
          tecnico : [null]
        }
      }      
    }
    else if(time_salvo.esquema_id == 2)
    {      
      return {
        timeCompleto : semLateral,
        timeVazio : {
          ataque : [null, null],
          meio : [null, null, null, null, null],
          zagueiro : [null, null, null],
          goleiro : [null],
          tecnico : [null]
        }
      }      
    }
    else if(time_salvo.esquema_id == 3)
    {      
      return {
        timeCompleto : comLateral,
        timeVazio : {
          ataque : [null, null, null],
          meio : [null, null, null],
          zagueiro : [null, null],
          lateral : [null, null],
          goleiro : [null],
          tecnico : [null]
        }
      }      
    }
    else if(time_salvo.esquema_id == 4)
    {      
      return {
        timeCompleto : comLateral,
        timeVazio : {
          ataque : [null, null],
          meio : [null, null, null, null],
          zagueiro : [null, null],
          lateral : [null, null],
          goleiro : [null],
          tecnico : [null]
        }
      } 
    }
    else if(time_salvo.esquema_id == 5)
    {      
      return {
        timeCompleto : comLateral,
        timeVazio : {
          ataque : [null],
          meio : [null, null, null, null, null],
          zagueiro : [null, null],
          lateral : [null, null],
          goleiro : [null],
          tecnico : [null]
        }
      } 
    }
    else if(time_salvo.esquema_id == 6)
    {      
      return {
        timeCompleto : comLateral,
        timeVazio : {
          ataque : [null, null],
          meio : [null, null, null],
          zagueiro : [null, null, null],
          lateral : [null, null],
          goleiro : [null],
          tecnico : [null]
        }
      } 
    }
    else if(time_salvo.esquema_id == 7)
    {      
      return {
        timeCompleto : comLateral,
        timeVazio : {
          ataque : [null],
          meio : [null, null, null, null],
          zagueiro : [null, null, null],
          lateral : [null, null],
          goleiro : [null],
          tecnico : [null]
        }
      } 
    }
  }

}

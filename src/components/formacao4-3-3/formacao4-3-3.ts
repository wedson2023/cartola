import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';
import { MercadoPage } from '../../pages/mercado/mercado';

@Component({
  selector: 'formacao4-3-3',
  templateUrl: 'formacao4-3-3.html'
})

export class Formacao4_3_3Component implements OnChanges {

  @Input() vender;
  @Output() mudouTime = new EventEmitter();

  private posicao_id;
  private time_salvo;
  private time_dados;

  constructor(
    private ModalController: ModalController,
    private navegaroff: NavegaroffProvider,
    private alertCtrl: AlertController
  ) {

    this.time_salvo = this.navegaroff.getItem('time_salvo');
    this.posicao_id = { 1 : 'goleiro', 2 : 'lateral', 3 : 'zagueiro', 4 : 'meio', 5 : 'ataque', 6 : 'tecnico' };    

    let escalacao = {
      ataque : this.time_salvo.atletas.filter(e => e.posicao_id === 5),
      meio : this.time_salvo.atletas.filter(e => e.posicao_id === 4),
      zagueiro : this.time_salvo.atletas.filter(e => e.posicao_id === 3),
      lateral : this.time_salvo.atletas.filter(e => e.posicao_id === 2),
      goleiro : this.time_salvo.atletas.filter(e => e.posicao_id === 1),
      tecnico : this.time_salvo.atletas.filter(e => e.posicao_id === 6)
    }

    this.time_dados = {      
      escalacao : escalacao,
      valor_time : this.time_salvo.valor_time,
      patrimonio : this.time_salvo.patrimonio,
      criar_time : true
    };
  }

  ngOnChanges(){   
    if(this.vender)
    {
      this.venderTime();
    } 
  }

  venderTime(){

    let alerta = this.alertCtrl.create({
      title : 'Confirme por favor',
      message : 'Tem certeza que deseja vender todo o time?',
      buttons : [
        {
          text : 'Não',
          role : 'cancel',
          handler : () => {
            this.vender = false;
          }
        },
        {
          text : 'Sim',
          handler: () => {
            this.time_dados.valor_time = 0,
            this.time_dados.patrimonio = this.time_salvo.patrimonio,

            this.time_dados.escalacao = {
              ataque : [null, null, null],
              meio : [null, null, null],
              zagueiro : [null, null],
              lateral : [null, null],
              goleiro : [null],
              tecnico : [null]
            }

            this.mudouTime.emit(this.time_dados);

            this.vender = false;
          }
        }
      ]
    });
    
    alerta.present();
   }

  seleciona(atleta, posicao_id){    
    var posicao = this.time_dados.escalacao[this.posicao_id[posicao_id]];
    if(atleta){
      posicao[posicao.indexOf(atleta)] = null;
      this.time_dados.valor_time -= atleta.preco_num; 
      this.mudouTime.emit(this.time_dados);
    }
    else
    {
      this.time_dados.posicao = this.posicao_id[posicao_id];
      this.time_dados.posicao_id = posicao_id;

      let modal = this.ModalController.create(MercadoPage, { time_dados : this.time_dados });
      modal.present();
      modal.onDidDismiss(() => {
        this.time_dados.escalacao = this.time_dados.escalacao;                       
        this.mudouTime.emit(this.time_dados);
      })
    }
  }  
}

import { MercadoPage } from './../../pages/mercado/mercado';
import { ModalController } from 'ionic-angular';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'formacao3-4-3',
  templateUrl: 'formacao3-4-3.html'
})
export class Formacao3_4_3Component {

  @Input() escalacao;
  @Input() time;

  @Output() mudouTime = new EventEmitter();
  private posicao_id = { 1 : 'goleiro', 3 : 'zagueiro', 4 : 'meio', 5 : 'ataque', 6 : 'tecnico' };

  constructor(
    private ModalController: ModalController,
  ) {}

  seleciona(atleta, posicao_id){

    var posicao = this.escalacao[this.posicao_id[posicao_id]];

    if(atleta){
      posicao[posicao.indexOf(atleta)] = null;
    }
    else
    {
      let modal = this.ModalController.create(MercadoPage, { escalacao : this.escalacao, time : this.time });
      modal.present();
      modal.onDidDismiss((atletaMercado) => {
        posicao[posicao.indexOf(atleta)] = atletaMercado;  
        this.mudouTime.emit(this.escalacao);       
      })
    }
  }

  ionViewDidLoad() {}
  
}

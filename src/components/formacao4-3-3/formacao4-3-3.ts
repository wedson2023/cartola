import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { MercadoPage } from '../../pages/mercado/mercado';

@Component({
  selector: 'formacao4-3-3',
  templateUrl: 'formacao4-3-3.html'
})
export class Formacao4_3_3Component {

  @Input() escalacao;
  @Input() time;

  @Output() mudouTime = new EventEmitter();
  private posicao_id = { 1 : 'goleiro', 2 : 'lateral', 3 : 'zagueiro', 4 : 'meio', 5 : 'ataque', 6 : 'tecnico' };
  private minha_escalacao;

  constructor(
    private ModalController: ModalController,
    private navegaroff: NavegaroffProvider
  ) {
    this.minha_escalacao = this.navegaroff.getItem('minha_escalacao');
  }

  seleciona(atleta, posicao_id){    
    var posicao = this.escalacao[this.posicao_id[posicao_id]];
    if(atleta){
      posicao[posicao.indexOf(atleta)] = null;
      this.minha_escalacao.valor_time -= atleta.preco_num; 
      this.mudouTime.emit({ valor_time : this.minha_escalacao.valor_time });
    }
    else
    {
      let dados = {
        posicao : this.posicao_id[posicao_id],
        posicao_id : posicao_id,
        escalacao : this.escalacao,
        valor_time : this.minha_escalacao.valor_time,
        patrimonio : this.minha_escalacao.patrimonio,
        carteira: this.minha_escalacao.patrimonio - this.minha_escalacao.valor_time,
        criar_time : true
      };

      let modal = this.ModalController.create(MercadoPage, { dados : dados });
      modal.present();
      modal.onDidDismiss((dados) => {
        if(dados)
        {        
          console.log('entrou');  
          this.escalacao = dados.escalacao; 
          this.mudouTime.emit(dados);
        }               
      })
    }
  }

  ionViewDidLoad() {}
  
}

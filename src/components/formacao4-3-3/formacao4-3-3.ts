import { FormacaoProvider } from './../../providers/formacao/formacao';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'formacao4-3-3',
  templateUrl: 'formacao4-3-3.html'
})

export class Formacao4_3_3Component implements OnChanges {

  @Input() vender;
  @Input() capitaoClass;
  @Output() mudouTime = new EventEmitter();

  private escalacao;
  private clubes;
  private capitao;  

  constructor(
    private formacao: FormacaoProvider
  ) {  
    this.capitao = this.formacao.getCapitao(); 
    this.escalacao = this.formacao.getEscalacao();
    this.clubes = this.formacao.getClubes();
  }

  ngOnChanges(){   
    if(this.vender)
    {
      let alerta = this.formacao.venderTime(this.vender, this.mudouTime);
      alerta.onDidDismiss(() => {       
       this.escalacao = this.formacao.getEscalacao(); 
      });
      this.vender = null;
    }

    for(let x in this.escalacao)
    {
      for(let i in this.escalacao[x])
      {
        if(!this.escalacao[x][i]) this.capitaoClass = 'sumir_capitao';
      }
    }
  }  

  selecionaCapitao(capitao){
    this.formacao.setCapitao(capitao, this.mudouTime);
    this.capitao = this.formacao.getCapitao();
  }

  seleciona(atleta, posicao_id){
    this.formacao.selecionaAtleta(atleta, posicao_id, this.mudouTime);
  }  
}

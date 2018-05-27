import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { HttpProvider } from './../../providers/http/http';
import { FormacaoProvider } from './../../providers/formacao/formacao';
import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-campinho',
  templateUrl: 'campinho.html',
})
export class CampinhoPage {

  public esquema;
  public time_salvo;
  public time_novo;
  public vender;
  public salvarTime;  
  public acao_btn = 'Salvar';

  constructor(
    public navegaroff: NavegaroffProvider,
    private formacao: FormacaoProvider,
    private http: HttpProvider,
    private mensagem: MensagemProvider
  ) {
    this.time_salvo = this.navegaroff.getItem('time_salvo');    
    this.esquema = this.time_salvo.time.esquema_id;      

    this.salvarTime = {
      atletas : [],
      capitao : null,
      esquema : this.time_salvo.esquema_id
    }
  }

  mudouTime(dados){ 
    //console.log(dados);
    this.time_novo = dados.escalacao;
    this.time_salvo.valor_time = dados.valor_time;

    for(let x in dados.escalacao)
    {
      let existe = dados.escalacao[x].some(e => e == null);
      if(existe)
      {
        this.acao_btn = 'Voltar';
        return false;
      }
      else
      {
        this.acao_btn = 'Salvar';
      }
    }
  }

  venderTime(){    
    this.vender = true;
  }

  salvar(){
    if(this.acao_btn == 'Salvar')
    {

      for(let x in this.time_novo)
      {
        for(let i in this.time_novo[x])
        {
          this.salvarTime.atletas.push(this.time_novo[x][i].atleta_id);
        }
      }

      console.log(this.salvarTime)

      if(this.salvarTime.capitao)
      {
        // this.http.getApiSalvar('auth/time/salvar', this.salvarTime).subscribe(function(response){
        //   console.log(response);
        // }, err => {
        //   console.log(err);
        // });
      }
      else
      {
        this.mensagem.mensagem('Alerta', 'Por favor selecione o seu capitão.');
      }

     
    }
    else
    {
      let escalacao = this.formacao.meuEsquema(this.time_salvo)['timeCompleto'];
    }
  }
}

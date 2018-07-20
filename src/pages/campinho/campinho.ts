import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { HttpProvider } from './../../providers/http/http';
import { FormacaoProvider } from './../../providers/formacao/formacao';
import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';

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
  public capitaoClass;
  public status_mercado;
  public acessa_esquema;
  public ultimo_esquema;

  constructor(
    public navegaroff: NavegaroffProvider,
    private formacao: FormacaoProvider,
    private http: HttpProvider,
    private mensagem: MensagemProvider,
    private loadingCtrl: LoadingController
  ) {
    this.time_salvo = this.navegaroff.getItem('time_salvo');    
    this.status_mercado = this.navegaroff.getItem('status_mercado');

    let valor_time = 0;
    let escalacao_atual = this.navegaroff.getItem('escalacao_atual');

    if(escalacao_atual)
    {
      
      for(let x in escalacao_atual)
      {
        for(let i in escalacao_atual[x])
        {
          if(escalacao_atual[x][i])
          {
            valor_time += escalacao_atual[x][i].preco_num;
          }
        }
      }
      this.time_salvo.valor_time = valor_time; 
    }

    this.navegaroff.setItem('ultimo_esquema', this.time_salvo.time.esquema_id);
    
    this.esquema = this.time_salvo.time.esquema_id;      
    this.acessa_esquema = this.time_salvo.time.esquema_id;   
    this.ultimo_esquema = this.time_salvo.time.esquema_id;

    this.salvarTime = {
      atletas : [],
      capitao : null,
      esquema : this.acessa_esquema
    }
  }

  mudouTime(dados){ 
    console.log(dados);
    this.time_novo = dados.escalacao;
    this.time_salvo.valor_time = dados.valor_time; 
    this.salvarTime.capitao = dados.capitao_id;
    this.acessa_esquema = dados.acessa_esquema; 

    this.navegaroff.setItem('escalacao_atual', dados.escalacao);
    
    for(let x in dados.escalacao)
    {
      let existe = dados.escalacao[x].some(e => e == null);
      if(existe)
      {        
        this.capitaoClass = 'sumir_capitao';
        return false;
      }
      else
      {        
        this.capitaoClass = null;
      }
    }
  }

  escolher_formacao(esquema){
    let escalacao = this.formacao.minhaEscalacao(this.navegaroff.getItem('escalacao_atual'), esquema); 
    if(escalacao['__zone_symbol__value'])
    {
      this.navegaroff.setItem('ultimo_esquema', esquema);
      this.acessa_esquema = esquema;
    }
    else
    {
      setTimeout(() => {
        this.esquema = parseInt(this.navegaroff.getItem('ultimo_esquema'));
      }, 250);
    }
  }

  venderTime(){    
    this.vender = true;
  }

  salvar(){
      let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
      loading.present();

      this.salvarTime.atletas = [];

      for(let x in this.time_novo)
      {
        for(let i in this.time_novo[x])
        {
          this.salvarTime.atletas.push(this.time_novo[x][i].atleta_id);
        }
      }

      if(this.salvarTime.capitao)
      {
        this.http.getApiSalvar('auth/time/salvar', this.salvarTime).subscribe((response) => {
          this.mensagem.mensagem('Sucesso', response['mensagem']);
          loading.dismiss();          
        }, err => {
          this.mensagem.mensagem('Não cadastrado', err['error'].mensagem);
          loading.dismiss();          
        });
      }
      else
      {
        this.mensagem.mensagem('Alerta', 'Por favor selecione o seu capitão.');
      }
       
      loading.dismiss();
    }

}

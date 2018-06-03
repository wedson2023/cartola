import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { HttpProvider } from './../../providers/http/http';
import { FormacaoProvider } from './../../providers/formacao/formacao';
import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';

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
  public restaurar_time;

  constructor(
    public navegaroff: NavegaroffProvider,
    private formacao: FormacaoProvider,
    private http: HttpProvider,
    private mensagem: MensagemProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.time_salvo = this.navegaroff.getItem('time_salvo');    
    this.esquema = this.time_salvo.time.esquema_id;      

    this.salvarTime = {
      atletas : [],
      capitao : null,
      esquema : 3
    }
  }

  mudouTime(dados){ 
    console.log(dados);
    this.time_novo = dados.escalacao;
    this.time_salvo.valor_time = dados.valor_time;
    this.salvarTime.capitao = dados.capitao_id;    

    for(let x in dados.escalacao)
    {
      let existe = dados.escalacao[x].some(e => e == null);
      if(existe)
      {
        this.acao_btn = 'Voltar';
        this.capitaoClass = 'sumir_capitao';
        return false;
      }
      else
      {
        this.capitaoClass = null;
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
    else
    {
      let alerta = this.alertCtrl.create({
        title : 'Confirme por favor',
        message : 'Tem certeza que deseja restaurar o time?',
        buttons : [
          {
            text : 'Não',
            role : 'cancel',
            handler : () => {}
          },
          {
            text : 'Sim',
            handler: () => {
              let escalacao = this.formacao.meuEsquema(this.time_salvo)['timeCompleto'];      
              this.restaurar_time = escalacao;
            }
          }
        ]
      });

      alerta.present();     
    }
  }
}

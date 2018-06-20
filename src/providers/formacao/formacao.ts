import { Injectable } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import { NavegaroffProvider } from '../navegaroff/navegaroff';
import { MercadoPage } from '../../pages/mercado/mercado';
import { MensagemProvider } from '../mensagem/mensagem';

@Injectable()
export class FormacaoProvider {

  private posicao_id;
  private time_salvo;
  private time_dados;

  public esquema = { 
    1 : {
      'ataque' : 3,
      'meio' : 4,
      'zagueiro' : 3 
    },
    2 : {
      'ataque' : 2,
      'meio' : 5,
      'zagueiro' : 3
    },
    3 : {
      'ataque' : 3,
      'meio' : 3,
      'lateral' : 2,
      'zagueiro' : 2
    }
  }

  constructor(
    private alertCtrl: AlertController,
    private navegaroff: NavegaroffProvider,
    private ModalController: ModalController,
    private mensagem: MensagemProvider
  ) {
    this.posicao_id = { 1 : 'goleiro', 2 : 'lateral', 3 : 'zagueiro', 4 : 'meio', 5 : 'ataque', 6 : 'tecnico' };
    
    this.time_salvo = this.navegaroff.getItem('time_salvo');
    let escalacao = this.meuEsquema(this.time_salvo, this.time_salvo.time.esquema_id)['timeCompleto'];
    this.navegaroff.setItem('escalacao_atual', escalacao);

    this.time_dados = {      
      escalacao : escalacao,
      valor_time : this.time_salvo.valor_time,
      patrimonio : this.time_salvo.patrimonio,
      criar_time : true,
      capitao_id : this.time_salvo.capitao_id,
      acessa_esquema : this.time_salvo.time.esquema_id
    };
  }

  getEsquema(){
    return this.time_salvo.time.esquema_id;
  }

  // setEsquema(esquema){
  //   this.time_salvo.time.esquema_id = esquema;
  // }

  getEscalacao(){
    return this.time_dados.escalacao;
  }

  getClubes(){
    return this.time_salvo.clubes;
  }

  setCapitao(capitao_id, mudouTime){
    this.time_dados.capitao_id = capitao_id;
    mudouTime.emit(this.time_dados);
  }

  getCapitao(){
    return this.time_dados.capitao_id;
  }

  selecionaAtleta(atleta, posicao_id, mudouTime){    
    var posicao = this.time_dados.escalacao[this.posicao_id[posicao_id]];
    if(atleta){
      let atl = posicao.filter(e => e !== null && e.atleta_id === atleta.atleta_id)[0];
      posicao[posicao.indexOf(atl)] = null;      
      this.time_dados.valor_time -= atl.preco_num; 
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

            this.time_dados.escalacao = this.meuEsquema(this.time_salvo, this.time_salvo.time.esquema_id)['timeVazio'];
            this.time_dados.capitao_id = null;
            mudouTime.emit(this.time_dados);
            vender = false;
          }
        }
      ]
    });
    alerta.present();

    return alerta;
  };

  async minhaEscalacao(escalacao, esquema){
    for(let x in escalacao)
    {      
      // valida ataque
      if(x == 'ataque' && escalacao[x].length > this.esquema[esquema].ataque)
      {
        let remova = escalacao[x].length - this.esquema[esquema].ataque;
        let qtd_atletas_nulos = escalacao[x].filter(e => e == null).length;
        if(remova > qtd_atletas_nulos)
        {     
          this.mensagem.mensagem('Atenção', 'Por favor remova ' + (remova - qtd_atletas_nulos) + ' atleta do ATAQUE, antes de alterar o esquema');      
          return false;
        }
        else
        {
          for(let i in escalacao[x])
          {
            if(escalacao[x][i] == null && remova != 0)
            {
              escalacao[x].splice(escalacao[x].indexOf(null), 1);              
              remova--;
            }
          }
        }
      }
      else if(x == 'ataque' && escalacao[x].length < this.esquema[esquema].ataque)
      {
        let adicione = this.esquema[esquema].meio - escalacao[x].length; 
        let a = 0; 
        while(a < adicione)
        {
          escalacao[x].push(null);
          a++;
        }      
      }

      // valida meio

      if(x == 'meio' && escalacao[x].length > this.esquema[esquema].meio)
      {
        let remova = escalacao[x].length - this.esquema[esquema].meio;
        let qtd_atletas_nulos = escalacao[x].filter(e => e == null).length;
        
        if(remova > qtd_atletas_nulos)
        {     
          this.mensagem.mensagem('Atenção', 'Por favor remova ' + (remova - qtd_atletas_nulos) + ' atleta do MEIO, antes de alterar o esquema');      
          return false;          
        }
        else
        {          
          for(let i in escalacao[x])
          {
            if(escalacao[x][i] == null && remova != 0)
            {
              escalacao[x].splice(escalacao[x].indexOf(null), 1);
              remova--;
            }
          }
        }
      }
      else if(x == 'meio' && escalacao[x].length < this.esquema[esquema].meio)
      {
        let adicione = this.esquema[esquema].meio - escalacao[x].length; 
        let a = 0; 
        while(a < adicione)
        {
          escalacao[x].push(null);
          a++;
        }      
      }

      // valida zagueiro      
      if(x == 'zagueiro' && escalacao[x].length > this.esquema[esquema].zagueiro)
      {
        let remova = escalacao[x].length - this.esquema[esquema].zagueiro;
        let qtd_atletas_nulos = escalacao[x].filter(e => e == null).length;
        if(remova > qtd_atletas_nulos)
        {     
          this.mensagem.mensagem('Atenção', 'Por favor remova ' + (remova - qtd_atletas_nulos) + ' atleta da ZAGA, antes de alterar o esquema');
          return false;          
        }
        else
        {
          for(let i in escalacao[x])
          {
            if(escalacao[x][i] == null && remova != 0)
            {
              escalacao[x].splice(escalacao[x].indexOf(null), 1);
              remova--;
            }
          }
        }
      }
      else if(x == 'zagueiro' && escalacao[x].length < this.esquema[esquema].zagueiro)
      {
        escalacao[x].push(null);
      }

    }

    // valida lateral

    if(escalacao.lateral === undefined && this.esquema[esquema].lateral !== undefined)
    {
      escalacao['lateral'] = [null, null];
    }
    else
    {
      delete escalacao['lateral'];
    }

    this.navegaroff.setItem('escalacao_atual', escalacao);
    this.time_dados.acessa_esquema = esquema;
    this.time_dados.escalacao = escalacao;      
    return true;
    
  }

  meuEsquema(time_salvo, esquema){

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

    if(esquema == 1)
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
    else if(esquema == 2)
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
    else if(esquema == 3)
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
    else if(esquema == 4)
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
    else if(esquema == 5)
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
    else if(esquema == 6)
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
    else if(esquema == 7)
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

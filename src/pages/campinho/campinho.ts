import { NavegaroffProvider } from './../../providers/navegaroff/navegaroff';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-campinho',
  templateUrl: 'campinho.html',
})
export class CampinhoPage {

  public formacao;
  public esquema;
  public minha_escalacao;
  public atletas;
  public carteira;

  public ataque;
  public meio;
  public lateral;
  public zagueiro;
  public goleiro;
  public tecnico;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navegaroff: NavegaroffProvider
  ) {
    this.minha_escalacao = this.navegaroff.getItem('minha_escalacao');
    
    this.esquema = this.minha_escalacao.time.esquema_id;    
    this.escolher_formacao(this.esquema);    
  }

  mudouTime(dados){
    this.minha_escalacao.valor_time = dados.valor_time;
  }

  escolher_formacao(formacao){
    if(formacao == 1)
    {    
      this.atletas = {
        ataque : this.minha_escalacao.atletas.filter(e => e.posicao_id === 5),
        meio : this.minha_escalacao.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 3),
        goleiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.minha_escalacao.atletas.filter(e => e.posicao_id === 6)
      }

      this.formacao = formacao;
    }
    else if(formacao == 2)
    {
      this.atletas = {
        ataque : this.minha_escalacao.atletas.filter(e => e.posicao_id === 5),
        meio : this.minha_escalacao.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 3),
        goleiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.minha_escalacao.atletas.filter(e => e.posicao_id === 6)
      }
    }
    else if(formacao == 3)
    {      
      this.atletas = {
        ataque : this.minha_escalacao.atletas.filter(e => e.posicao_id === 5),
        meio : this.minha_escalacao.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 3),
        lateral : this.minha_escalacao.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.minha_escalacao.atletas.filter(e => e.posicao_id === 6)
      }
    }
    else if(formacao == 4)
    {
      this.atletas = {
        ataque : this.minha_escalacao.atletas.filter(e => e.posicao_id === 5),
        meio : this.minha_escalacao.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 3),
        lateral : this.minha_escalacao.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.minha_escalacao.atletas.filter(e => e.posicao_id === 6)
      }
    }    
    else if(formacao == 5)
    {
      this.atletas = {
        ataque : this.minha_escalacao.atletas.filter(e => e.posicao_id === 5),
        meio : this.minha_escalacao.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 3),
        lateral : this.minha_escalacao.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.minha_escalacao.atletas.filter(e => e.posicao_id === 6)
      }
    }    
    else if(formacao == 6)
    {
      this.atletas = {
        ataque : this.minha_escalacao.atletas.filter(e => e.posicao_id === 5),
        meio : this.minha_escalacao.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 3),
        lateral : this.minha_escalacao.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.minha_escalacao.atletas.filter(e => e.posicao_id === 6)
      }
    }    
    else if(formacao == 7)
    {
      this.atletas = {
        ataque : this.minha_escalacao.atletas.filter(e => e.posicao_id === 5),
        meio : this.minha_escalacao.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 3),
        lateral : this.minha_escalacao.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.minha_escalacao.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.minha_escalacao.atletas.filter(e => e.posicao_id === 6)
      }
    }    
  }
  
  ionViewDidLoad() {}

}

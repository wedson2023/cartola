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
  public time_salvo;
  public atletas;
  public vender;

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
    this.time_salvo = this.navegaroff.getItem('time_salvo');
    
    this.esquema = this.time_salvo.time.esquema_id;    
    this.escolher_formacao(this.esquema);    
  }

  mudouTime(dados){
    this.time_salvo.valor_time = dados.valor_time;
  }

  venderTime(){    
    this.vender = true;
  }

  escolher_formacao(formacao){
    if(formacao == 1)
    {    
      this.atletas = {
        ataque : this.time_salvo.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_salvo.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_salvo.atletas.filter(e => e.posicao_id === 3),
        goleiro : this.time_salvo.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_salvo.atletas.filter(e => e.posicao_id === 6)
      }

      this.formacao = formacao;
    }
    else if(formacao == 2)
    {
      this.atletas = {
        ataque : this.time_salvo.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_salvo.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_salvo.atletas.filter(e => e.posicao_id === 3),
        goleiro : this.time_salvo.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_salvo.atletas.filter(e => e.posicao_id === 6)
      }
    }
    else if(formacao == 3)
    {      
      // this.atletas = {
      //   ataque : this.time_salvo.atletas.filter(e => e.posicao_id === 5),
      //   meio : this.time_salvo.atletas.filter(e => e.posicao_id === 4),
      //   zagueiro : this.time_salvo.atletas.filter(e => e.posicao_id === 3),
      //   lateral : this.time_salvo.atletas.filter(e => e.posicao_id === 2),
      //   goleiro : this.time_salvo.atletas.filter(e => e.posicao_id === 1),
      //   tecnico : this.time_salvo.atletas.filter(e => e.posicao_id === 6)
      // }
    }
    else if(formacao == 4)
    {
      this.atletas = {
        ataque : this.time_salvo.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_salvo.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_salvo.atletas.filter(e => e.posicao_id === 3),
        lateral : this.time_salvo.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.time_salvo.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_salvo.atletas.filter(e => e.posicao_id === 6)
      }
    }    
    else if(formacao == 5)
    {
      this.atletas = {
        ataque : this.time_salvo.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_salvo.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_salvo.atletas.filter(e => e.posicao_id === 3),
        lateral : this.time_salvo.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.time_salvo.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_salvo.atletas.filter(e => e.posicao_id === 6)
      }
    }    
    else if(formacao == 6)
    {
      this.atletas = {
        ataque : this.time_salvo.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_salvo.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_salvo.atletas.filter(e => e.posicao_id === 3),
        lateral : this.time_salvo.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.time_salvo.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_salvo.atletas.filter(e => e.posicao_id === 6)
      }
    }    
    else if(formacao == 7)
    {
      this.atletas = {
        ataque : this.time_salvo.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_salvo.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_salvo.atletas.filter(e => e.posicao_id === 3),
        lateral : this.time_salvo.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.time_salvo.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_salvo.atletas.filter(e => e.posicao_id === 6)
      }
    }    
  }
  
  ionViewDidLoad() {}

}

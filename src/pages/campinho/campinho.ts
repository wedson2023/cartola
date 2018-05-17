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
  public esquema_selecionado;
  public time_info;
  public atletas;
  public valor_time;

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
    this.time_info = this.navegaroff.getItem('minha_escalacao');
    this.valor_time = this.time_info.atletas.reduce((prev, cur) => { return prev + cur.preco_num }, 0); 

    this.esquema_selecionado = this.time_info.time.esquema_id;    
    this.escolher_formacao(this.esquema_selecionado);    
  }

  mudouTime(event){
    console.log(event);
  }

  escolher_formacao(formacao){
    console.log(formacao);
    if(formacao == 1)
    {    
      this.atletas = {
        ataque : this.time_info.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_info.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_info.atletas.filter(e => e.posicao_id === 3),
        goleiro : this.time_info.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_info.atletas.filter(e => e.posicao_id === 6)
      }

      this.formacao = formacao;
    }
    else if(formacao == 2)
    {
      this.atletas = {
        ataque : this.time_info.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_info.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_info.atletas.filter(e => e.posicao_id === 3),
        goleiro : this.time_info.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_info.atletas.filter(e => e.posicao_id === 6)
      }
    }
    else if(formacao == 3)
    {
      console.log(this.atletas);
      this.atletas = {
        ataque : this.time_info.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_info.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_info.atletas.filter(e => e.posicao_id === 3),
        lateral : this.time_info.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.time_info.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_info.atletas.filter(e => e.posicao_id === 6)
      }
    }
    else if(formacao == 4)
    {
      this.atletas = {
        ataque : this.time_info.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_info.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_info.atletas.filter(e => e.posicao_id === 3),
        lateral : this.time_info.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.time_info.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_info.atletas.filter(e => e.posicao_id === 6)
      }
    }    
    else if(formacao == 5)
    {
      this.atletas = {
        ataque : this.time_info.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_info.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_info.atletas.filter(e => e.posicao_id === 3),
        lateral : this.time_info.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.time_info.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_info.atletas.filter(e => e.posicao_id === 6)
      }
    }    
    else if(formacao == 6)
    {
      this.atletas = {
        ataque : this.time_info.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_info.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_info.atletas.filter(e => e.posicao_id === 3),
        lateral : this.time_info.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.time_info.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_info.atletas.filter(e => e.posicao_id === 6)
      }
    }    
    else if(formacao == 7)
    {
      this.atletas = {
        ataque : this.time_info.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_info.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_info.atletas.filter(e => e.posicao_id === 3),
        lateral : this.time_info.atletas.filter(e => e.posicao_id === 2),
        goleiro : this.time_info.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_info.atletas.filter(e => e.posicao_id === 6)
      }
    }    
  }


  selecionar_atleta(id){
    console.log(id);
  }
  ionViewDidLoad() {}

}

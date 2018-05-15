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
    this.formacao = this.time_info.esquema_id;      
    
    if(this.formacao == 3)
    {     
      this.atletas = {
        ataque : this.time_info.atletas.filter(e => e.posicao_id === 5),
        meio : this.time_info.atletas.filter(e => e.posicao_id === 4),
        zagueiro : this.time_info.atletas.filter(e => e.posicao_id === 3),
        goleiro : this.time_info.atletas.filter(e => e.posicao_id === 1),
        tecnico : this.time_info.atletas.filter(e => e.posicao_id === 6)
      }
    }
  }

  ionViewDidLoad() {}

}

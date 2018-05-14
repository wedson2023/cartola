import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-campinho',
  templateUrl: 'campinho.html',
})
export class CampinhoPage {

  public formacao;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.formacao = 3;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampinhoPage');
  }

}

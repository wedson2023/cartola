import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-destaque',
  templateUrl: 'modal-destaque.html',
})
export class ModalDestaquePage {

  data:String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad(){
    this.data = this.navParams.get('data');
    console.log(this.data);
  }

  ionViewDidLoad() {
   
  }

}

import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class MensagemProvider {

  constructor(private alert: AlertController) {}

  mensagem(titulo, subtitle){
    let alert = this.alert.create({
    title: titulo,
    subTitle: subtitle,
    buttons: ['Entendi']
  });
  alert.present();
  }
}

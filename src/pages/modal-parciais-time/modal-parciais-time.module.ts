import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalParciaisTimePage } from './modal-parciais-time';

@NgModule({
  declarations: [
    ModalParciaisTimePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalParciaisTimePage),
  ],
})
export class ModalParciaisTimePageModule {}

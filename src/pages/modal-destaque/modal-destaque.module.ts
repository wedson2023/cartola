import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDestaquePage } from './modal-destaque';

@NgModule({
  declarations: [
    ModalDestaquePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDestaquePage),
  ],
})
export class ModalDestaquePageModule {}

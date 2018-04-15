import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemJogadorPage } from './tem-jogador';

@NgModule({
  declarations: [
    TemJogadorPage,
  ],
  imports: [
    IonicPageModule.forChild(TemJogadorPage),
  ],
})
export class TemJogadorPageModule {}

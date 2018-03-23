import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoPage } from './historico';
import { HttpClientModule } from '@angular/common/http';
import { PosicaoJogadorPipe } from './../../pipes/posicao-jogador/posicao-jogador';

@NgModule({
  declarations: [
    HistoricoPage,
    PosicaoJogadorPipe
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(HistoricoPage),
  ],
})
export class HistoricoPageModule {}

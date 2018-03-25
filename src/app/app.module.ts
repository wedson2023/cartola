import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ParciaisJogadoresPage } from './../pages/parciais-jogadores/parciais-jogadores';
import { PosicaoJogadorPipe } from './../pipes/posicao-jogador/posicao-jogador';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegulamentoPage } from '../pages/regulamento/regulamento';
import { HistoricoPage } from '../pages/historico/historico';
import { DestaquesPage } from '../pages/destaques/destaques';
import { PartidasPage } from '../pages/partidas/partidas';
import { MercadoPage } from '../pages/mercado/mercado';
import { StatusJogadorPipe } from '../pipes/status-jogador/status-jogador';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ParciaisJogadoresPage,
    PosicaoJogadorPipe,
    DestaquesPage,
    RegulamentoPage,
    HistoricoPage,
    PartidasPage,
    MercadoPage,
    StatusJogadorPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ParciaisJogadoresPage,
    DestaquesPage,
    RegulamentoPage,
    HistoricoPage,
    PartidasPage,
    MercadoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

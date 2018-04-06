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
import { Screenshot } from '@ionic-native/screenshot';

import { RegulamentoPage } from '../pages/regulamento/regulamento';
import { HistoricoPage } from '../pages/historico/historico';
import { DestaquesPage } from '../pages/destaques/destaques';
import { PartidasPage } from '../pages/partidas/partidas';
import { MercadoPage } from '../pages/mercado/mercado';
import { StatusJogadorPipe } from '../pipes/status-jogador/status-jogador';
import { HttpProvider } from '../providers/http/http';
import { TimesPage } from '../pages/times/times';
import { LigasPage } from '../pages/ligas/ligas';
import { TimesLigaPage } from '../pages/times-liga/times-liga';
import { FilterPipe } from '../pipes/filter/filter';
import { IconMenuPipe } from '../pipes/icon-menu/icon-menu';
import { PremiacaoPage } from '../pages/premiacao/premiacao';
import { NavegaroffProvider } from '../providers/navegaroff/navegaroff';

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
    TimesPage,
    LigasPage,
    PremiacaoPage,
    StatusJogadorPipe,
    TimesLigaPage,
    FilterPipe,
    IconMenuPipe,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
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
    MercadoPage,
    TimesPage,
    LigasPage,
    PremiacaoPage,
    TimesLigaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Screenshot,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    NavegaroffProvider
  ]
})
export class AppModule {}

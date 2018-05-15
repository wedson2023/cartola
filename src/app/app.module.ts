import { Formacao3_4_3Component } from './../components/formacao3-4-3/formacao3-4-3';
import { TransacoesPage } from './../pages/transacoes/transacoes';
import { CampinhoPage } from './../pages/campinho/campinho';
import { CriarTimePage } from './../pages/criar-time/criar-time';
import { LoginPage } from './../pages/login/login';
import { MeuTimePage } from './../pages/meu-time/meu-time';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BackgroundMode } from '@ionic-native/background-mode';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

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
import { MensagemProvider } from '../providers/mensagem/mensagem';
import { MercadoComponent } from '../components/mercado/mercado';
import { PontuacaoComponent } from '../components/pontuacao/pontuacao';
import { ParciaisPage } from '../pages/parciais/parciais';
import { ParciaisTimesPage } from '../pages/parciais-times/parciais-times';
import { ParciaisJogadoresPage } from '../pages/parciais-jogadores/parciais-jogadores';
import { ParciaisClubesPage } from '../pages/parciais-clubes/parciais-clubes';
import { ConfigPage } from '../pages/config/config';
import { ClassificacaoPage } from '../pages/classificacao/classificacao';
import { TemJogadorPage } from '../pages/tem-jogador/tem-jogador';
import { ModalDestaquePage } from '../pages/modal-destaque/modal-destaque';
import { NacionalPage } from './../pages/nacional/nacional';
import { ModalParciaisTimePage } from '../pages/modal-parciais-time/modal-parciais-time';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
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
    MercadoComponent,
    PontuacaoComponent,
    ParciaisPage,
    ParciaisTimesPage,
    ParciaisJogadoresPage,
    ParciaisClubesPage,
    ConfigPage,
    ClassificacaoPage,
    TemJogadorPage,
    ModalDestaquePage,
    NacionalPage,
    MeuTimePage,
    ModalParciaisTimePage,
    LoginPage,
    CriarTimePage,
    CampinhoPage,
    TransacoesPage,
    Formacao3_4_3Component
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
    DestaquesPage,
    RegulamentoPage,
    HistoricoPage,
    PartidasPage,
    MercadoPage,
    TimesPage,
    LigasPage,
    PremiacaoPage,
    TimesLigaPage,
    MercadoComponent,
    PontuacaoComponent,
    ParciaisPage,
    ParciaisTimesPage,
    ParciaisJogadoresPage,
    ParciaisClubesPage,
    ConfigPage,
    ClassificacaoPage,
    TemJogadorPage,
    ModalDestaquePage,
    NacionalPage,
    MeuTimePage,
    ModalParciaisTimePage,
    LoginPage,
    CriarTimePage,
    CampinhoPage,
    TransacoesPage,
    Formacao3_4_3Component
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Screenshot,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    NavegaroffProvider,
    MensagemProvider,
    SocialSharing,
    BackgroundMode
  ]
})
export class AppModule {}

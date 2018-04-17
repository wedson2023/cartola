import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { BackgroundMode } from '@ionic-native/background-mode';

import { HomePage } from '../pages/home/home';
import { RegulamentoPage } from '../pages/regulamento/regulamento';
import { DestaquesPage } from '../pages/destaques/destaques';
import { MercadoPage } from '../pages/mercado/mercado';
import { TimesPage } from '../pages/times/times';
import { LigasPage } from '../pages/ligas/ligas';
import { PremiacaoPage } from '../pages/premiacao/premiacao';
import { ParciaisPage } from '../pages/parciais/parciais';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Destaques', component: DestaquesPage },  
      { title: 'Mercado', component: MercadoPage },          
      { title: 'Parciais', component: ParciaisPage }, 
      { title: 'Times', component: TimesPage },   
      { title: 'Ligas', component: LigasPage },   
      { title: 'Premiação', component: PremiacaoPage },   
      { title: 'Regulamento', component: RegulamentoPage }
    ]

    if(localStorage.getItem('liga_padrao') === null)
    {
      localStorage.setItem('liga_padrao', 'campeoes-agrestina');
    } 
    else if(localStorage.getItem('liga_padrao') != 'campeoes-agrestina')
    {
      this.pages.splice(6, 2);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

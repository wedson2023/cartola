import { HttpClient } from '@angular/common/http';
import { ParciaisPage } from './../pages/parciais/parciais';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';

import { HomePage } from '../pages/home/home';
import { RegulamentoPage } from '../pages/regulamento/regulamento';
import { DestaquesPage } from '../pages/destaques/destaques';
import { MercadoPage } from '../pages/mercado/mercado';
import { TimesPage } from '../pages/times/times';
import { LigasPage } from '../pages/ligas/ligas';
import { PremiacaoPage } from '../pages/premiacao/premiacao';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  static pages: Array<{title: string, component: any}>;

  link;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private http: HttpClient,
    private IonicApp: IonicApp,
    private background: BackgroundMode
  ) {
    this.initializeApp();

    this.platform.registerBackButtonAction(response => {
      const activePortal = (this.IonicApp._overlayPortal.getActive() || this.IonicApp._modalPortal.getActive());
      if(activePortal)
      {
        activePortal.dismiss();
      } 
      else
      {
        if(this.nav.canGoBack())
        {
          this.nav.pop();
        }
        else
        {
          this.background.moveToBackground();
        }        
      }
    }, 0);

    this.http.get('http://wedsonwebdesigner.com.br/cartola/atualizacao.php').subscribe(response => {
      this.link = response;
    });
    
    MyApp.pages = [  
      { title: 'Destaques', component: DestaquesPage },  
      { title: 'Mercado', component: MercadoPage },          
      { title: 'Parciais', component: ParciaisPage }, 
      { title: 'Times', component: TimesPage },   
      { title: 'Ligas', component: LigasPage },   
      { title: 'Premiação', component: PremiacaoPage },   
      { title: 'Regulamento', component: RegulamentoPage }
    ]

    this.pages = MyApp.pages;

    if(localStorage.getItem('liga_padrao') === null)
    {
      localStorage.setItem('liga_padrao', 'campeoes-agrestina');
    } 
    else if(localStorage.getItem('liga_padrao') != 'campeoes-agrestina')
    {
      this.pages.splice(5, 2);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }
}

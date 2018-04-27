import { HttpClient } from '@angular/common/http';
import { ParciaisPage } from './../pages/parciais/parciais';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

  link;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private http: HttpClient
  ) {
    this.initializeApp();    

    this.http.get('http://wedsonwebdesigner.com.br/cartola/atualizacao.php').subscribe(response => {
      this.link = response;
    });
    
    this.pages = [  
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
      console.log(this.pages);
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }
}

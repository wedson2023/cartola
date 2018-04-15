import { Component } from '@angular/core';
import { IonicPage, LoadingController, ViewController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { MensagemProvider } from '../../providers/mensagem/mensagem';

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage{

  public ligas;

  constructor(
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private MensagemProvider: MensagemProvider,
    private viewCtrl: ViewController
  ) {

  }

  marcar_liga(liga){
    localStorage.setItem('liga_padrao', liga);
    this.viewCtrl.dismiss();
  }

  pesquisar(key, liga){    
    if(key.which === 13 && liga !== undefined && liga !== '')
    {      
      let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
      loading.present();
      let nome_liga = encodeURIComponent(liga);
      this.http.getApi('ligas?q=' + encodeURIComponent(nome_liga)).subscribe(response => {
       loading.dismiss();        
       this.ligas = response; 
      }, (err) => {
        loading.dismiss(); 
        this.MensagemProvider.mensagem('Algo deu errado', 'Por favor verifique sua conexão com a internet');
      });
    }    
  }

}

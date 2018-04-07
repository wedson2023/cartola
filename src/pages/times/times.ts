import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { LoadingController } from 'ionic-angular';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';
import { MensagemProvider } from '../../providers/mensagem/mensagem';

@IonicPage()
@Component({
  selector: 'page-times',
  templateUrl: 'times.html',
})
export class TimesPage {  

  public times:object;
  private favoritos; 
  
  constructor(
    private http:HttpProvider,
    private loadingCtrl:LoadingController,
    private navegaroff: NavegaroffProvider,
    private MensagemProvider: MensagemProvider
  ) 
  {
    if(this.navegaroff.getItem('times_favoritos') === null)
    {
      this.navegaroff.setItem('times_favoritos', JSON.parse('[]'));
    }

    this.favoritos = this.navegaroff.getItem('times_favoritos');
  }

  lista_favoritos(){
    this.times = this.favoritos;
  }

  marcar_favorito(time){
    let existe = this.favoritos.some(elemento => elemento.time_id == time.time_id);
    if(time.time_id == 60 || time.time_id == 71) return false;
    if(!existe)
    {
      this.favoritos.push(time);
      time.favorito = 'favorito';
    }
    else
    {
      let filtro_liga = this.favoritos.filter(elemento => elemento.time_id == time.time_id)[0];
      this.favoritos.splice(this.favoritos.indexOf(filtro_liga), 1);
      time.favorito = 'no-favorito';
    }

    this.navegaroff.setItem('times_favoritos', this.favoritos);
  }

  pesquisar(key, time){
    if(key.which === 13 && time !== undefined && time !== '')
    {
      let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
      loading.present();
      let nome_time = encodeURIComponent(time);
      this.http.getApi('times?q=' + encodeURIComponent(nome_time)).subscribe(response => {
        loading.dismiss(); 
        for(let x in response)
        {         
          let filtro_time = this.favoritos.filter(elemento => elemento.time_id == response[x].time_id)[0];
          if(filtro_time != undefined)
          {
           response[x].favorito = 'favorito';
          }
          else
          {
            response[x].favorito = 'no-favorito';
          }
        }
        this.navegaroff.setItem('times_favoritos', this.favoritos);
        this.times = response; 
      }, (err) => {
        loading.dismiss(); 
        this.MensagemProvider.mensagem('Algo deu errado', 'Por favor verifique sua conexão com a internet');
      });
    }    
  }

  ionViewDidLoad() {
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ModalController } from 'ionic-angular';
import { TimesLigaPage } from '../times-liga/times-liga';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ligas',
  templateUrl: 'ligas.html',
})
export class LigasPage {

  ligas;
  favoritos;  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http:HttpProvider,
    public ModalController: ModalController,
    private loadingCtrl: LoadingController
  ) 
  {
    if(localStorage.getItem('favoritos') === null)
    {
      localStorage.setItem('favoritos', '[]');
    }

    this.favoritos = JSON.parse(localStorage.favoritos);
  }

  lista_times(slug){
    let modal = this.ModalController.create(TimesLigaPage, { data : slug });
    modal.present();    
  }

  lista_favoritos(){
    this.ligas = this.favoritos;
  }

  marcar_favorito(liga){ 
    let existe = this.favoritos.some(elemento => elemento.liga_id == liga.liga_id);

    if(!existe)
    {
      this.favoritos.push(liga);
      liga.favorito = 'favorito';
    }
    else
    {
      console.log(liga.liga_id);
      let filtro_liga = this.favoritos.filter(elemento => elemento.liga_id == liga.liga_id)[0];
      this.favoritos.splice(this.favoritos.indexOf(filtro_liga), 1);
      liga.favorito = 'no-favorito';
    }

    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  pesquisar(key, liga){    
    if(key.which === 13 && liga !== undefined && liga !== '')
    {      
      let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
      loading.present();
      let nome_liga = encodeURIComponent(liga);
      this.http.getApi('ligas?q=' + encodeURIComponent(nome_liga)).subscribe(response => {
        loading.dismiss(); 
        for(let x in response)
        {
          let filtro_liga = this.favoritos.filter(elemento => elemento.liga_id == response[x].liga_id)[0];
          if(filtro_liga != undefined)
          {
            response[x].favorito = 'favorito';
          }
          else
          {
            response[x].favorito = 'no-favorito';
          }
          //console.log(filtro_liga.length);
        }

       this.ligas = response; 
      }, (err) => {
        loading.dismiss(); 
        console.log('Verifique sua conexão com a internet');
      });
    }    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LigasPage');
  }

}

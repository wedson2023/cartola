import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';
import { MensagemProvider } from '../../providers/mensagem/mensagem';

@IonicPage()
@Component({
  selector: 'page-tem-jogador',
  templateUrl: 'tem-jogador.html',
})
export class TemJogadorPage {
  private atleta_id;
  private apelido;
  private foto;
  private liga_id;
  private times;
  private atletas;
  private competidores = 'sim';
  private sim = [];
  private nao = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpProvider,
    private navegaroff: NavegaroffProvider,
    private mensagem: MensagemProvider,
    private viewCtrl: ViewController,
    private LoadingController: LoadingController
  ) {
    this.atleta_id = this.navParams.get('atleta_id');
    this.apelido = this.navParams.get('apelido');
    this.foto = this.navParams.get('foto');
    console.log(this.apelido, this.atleta_id, this.foto);
    this.liga_id = this.navegaroff.getItem('home_liga').liga.liga_id;
    this.times = this.navegaroff.getItem('home_liga').times;
  }

  tem_jogador(param){    
    this.atletas = param == 'sim' ? this.sim : this.nao;
  }

  ionViewDidLoad() {
    let loading = this.LoadingController.create({ content: 'Por favor aguarde...' });
    loading.present();
    this.http.getApi('/liga/' + this.liga_id + '/times').subscribe(response => {      
      for(let id in response)
      {
        if(response[id].atletas.includes(parseInt(this.atleta_id)))
        {
          this.sim.push(this.times.filter(e => e.time_id == id)[0]);          
        }
        else
        {
          this.nao.push(this.times.filter(e => e.time_id == id)[0]);  
        }
      }

      this.atletas = this.sim;
      loading.dismiss();
    }, err => {
      loading.dismiss();
      this.mensagem.mensagem('Algo deu errado', 'Verifique sua conexão com a internet por favor.');
      this.viewCtrl.dismiss();
    }    
    );
  }

}

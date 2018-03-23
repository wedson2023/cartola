import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage { 
  loading:any;  
  data:any;
  times:String = this.navParams.get('time');

  rodadas:Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]; 
  rodada:Number = this.navParams.get('rodada_id');

  nome:String;
  ano:String;
  foto_perfil:String;
  pontos:Number;
  posicao:String;
  atletas:Array<object>;
  res:object;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public loadingCtrl: LoadingController
  ) 
  {
  console.log(this.navParams.get('rodada_id'), this.navParams.get('time'));
    this.times = this.navParams.get('time');
  }

  buscar(){
    console.log(this.times);
      let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
      
        loading.present();
          this.httpClient.get('http://wedsonwebdesigner.com.br/cartola/index.php?api=time&time=' + this.times).subscribe(response => {
          let time = JSON.parse(JSON.stringify(response));
        console.log(time);
          if(time.length)
          {
            this.nome = time[0].nome;
            this.foto_perfil = time[0].foto_perfil;            
            this.httpClient.get('http://wedsonwebdesigner.com.br/cartola/index.php?api=rodada&slug=' + time[0].slug + '&rodada=' + this.rodada).subscribe(response => {
                let rodada = JSON.parse(JSON.stringify(response));
                this.httpClient.get('http://wedsonwebdesigner.com.br/cartola/index.php?api=clubes').subscribe(clubes => {
                for(let x in rodada.atletas)
                {
                  for(let i in clubes)
                  {                     
                    if(clubes[i].id == rodada.atletas[x].clube_id)
                    {
                    rodada.atletas[x].escudo = clubes[i].escudos;
                    }
                  }
                }
                console.log(rodada);
                this.data = rodada;
                this.ano = rodada.time.temporada_inicial;
                this.pontos = rodada.pontos;
                this.atletas = rodada.atletas;
                loading.dismiss();  
              })   
              })
          }
          else 
          {
            loading.dismiss();
            alert('Nome de time não encontrado!');              
          }          
          })
  }

  ionViewDidLoad() { 
    this.buscar();    
    //console.log('ionViewDidLoad HistoricoPage');
  }
}

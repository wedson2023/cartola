import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ModalController } from 'ionic-angular';
import { TimesLigaPage } from '../times-liga/times-liga';
import { LoadingController } from 'ionic-angular';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';
import { MensagemProvider } from '../../providers/mensagem/mensagem';

@IonicPage()
@Component({
  selector: 'page-ligas',
  templateUrl: 'ligas.html',
})
export class LigasPage {

  public ligas:object;
  private favoritos; 

  constructor(
    private http:HttpProvider,
    public ModalController: ModalController,
    private loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider,
    private MensagemProvider: MensagemProvider
  ) 
  {
    if(this.navegaroff.getItem('ligas_favoritos') === null)
    {
      this.navegaroff.setItem('ligas_favoritos', JSON.parse('[{"favorito":"favorito","liga_id":60,"time_dono_id":null,"clube_id":null,"nome":"Nacional","descricao":"A Liga do time campeão!","slug":"nacional","tipo":"F","mata_mata":false,"editorial":false,"patrocinador":false,"criacao":"2010-04-29 09:00:00","tipo_flamula":0,"tipo_estampa_flamula":null,"tipo_adorno_flamula":null,"cor_primaria_estampa_flamula":"888888","cor_secundaria_estampa_flamula":"CCCCCC","cor_borda_flamula":null,"cor_fundo_flamula":null,"url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_nacional.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_nacional.png","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_nacional.svg","mes_ranking_num":null,"mes_variacao_num":null,"camp_ranking_num":null,"camp_variacao_num":null,"total_times_liga":2056307,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":71,"time_dono_id":null,"clube_id":null,"nome":"Cartola PRO","descricao":"Só quem é Cartoleiro PRO participa dessa Liga. Não fique de fora e concorra a prêmios por rodada, mês e campeonato! Tá esperando o quê?","slug":"cartola-pro","tipo":"F","mata_mata":false,"editorial":true,"patrocinador":false,"criacao":"2012-04-25 12:00:00","tipo_flamula":1,"tipo_estampa_flamula":null,"tipo_adorno_flamula":null,"cor_primaria_estampa_flamula":"FFFFFF","cor_secundaria_estampa_flamula":"FFFFFF","cor_borda_flamula":null,"cor_fundo_flamula":null,"url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_pro.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_pro.png","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_pro.svg","mes_ranking_num":null,"mes_variacao_num":null,"camp_ranking_num":null,"camp_variacao_num":null,"total_times_liga":123287,"vagas_restantes":null,"total_amigos_na_liga":0,"favorito":"favorito"}]'));
    }

    this.favoritos = this.navegaroff.getItem('ligas_favoritos');
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
    if(liga.liga_id == 60 || liga.liga_id == 71) return false;
    if(!existe)
    {
      this.favoritos.push(liga);
      liga.favorito = 'favorito';
    }
    else
    {
      let filtro_liga = this.favoritos.filter(elemento => elemento.liga_id == liga.liga_id)[0];
      this.favoritos.splice(this.favoritos.indexOf(filtro_liga), 1);
      liga.favorito = 'no-favorito';
    }

    this.navegaroff.setItem('ligas_favoritos', this.favoritos);
  }

  pesquisar(key, liga){    
    if(key.which === 13 && liga !== undefined && liga !== '')
    {      
      let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
      loading.present();
      this.http.getApi('ligas?q=' + encodeURI(liga)).subscribe(response => {
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
        }
        this.navegaroff.setItem('ligas_favoritos', this.favoritos);
       this.ligas = response; 
      }, (err) => {
        loading.dismiss(); 
        this.MensagemProvider.mensagem('Algo deu errado', 'Por favor verifique sua conexão com a internet');
      });
    }    
  }

  ionViewDidLoad() {
    
  }

}

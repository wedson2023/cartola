import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';

@Component({
  selector: 'mercado',
  templateUrl: 'mercado.html'
})
export class MercadoComponent {

  atletas;
  filter = { status_id : null, posicao_id : 0, clube_id : null, preco_num : null };
  provavel;

  limpar(){
    this.viewCtrl.dismiss(this.navegaroff.getItem('mercado'));
  }

  filtrar(){
    let atletas = this.atletas.filter(e =>
      (!this.filter.status_id || e.status_id == this.filter.status_id) && (!this.filter.posicao_id || e.posicao_id == this.filter.posicao_id)  && (!this.filter.clube_id || e.clube_id == this.filter.clube_id) && (!this.filter.preco_num || (e.preco_num >= (this.filter.preco_num - 5) && e.preco_num <= this.filter.preco_num))  
    );

    this.viewCtrl.dismiss(atletas);
  }

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private navegaroff: NavegaroffProvider
  ) 
  {   
   delete this.navParams.data['component'];
   delete this.navParams.data['opts'];
   this.atletas = this.navParams.data;  
  }

}

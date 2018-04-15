import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { NavegaroffProvider } from '../../providers/navegaroff/navegaroff';

@IonicPage()
@Component({
  selector: 'page-parciais-times',
  templateUrl: 'parciais-times.html',
})
export class ParciaisTimesPage {
  

  constructor(
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private navegaroff: NavegaroffProvider
  ) {
  }

  ionViewDidLoad() {
    
  }

}

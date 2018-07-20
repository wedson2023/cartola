import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mata-mata',
  templateUrl: 'mata-mata.html',
})
export class MataMataPage {

  slug;
  liga;
  constructor(
    private navParams: NavParams,
    private http: HttpProvider
  ) {
    this.slug = this.navParams.get('slug');
  }

  ionViewDidLoad() {
    this.http.getApi('auth/liga/' + this.slug).subscribe((response:any) => {
      this.liga = response.chaves_mata_mata;
    });
  }

}

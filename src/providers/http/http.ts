import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class HttpProvider {

  private ApiLocal:string;
  private ApiCartola:string;
  private Token:string;

  constructor(public http: HttpClient) {
    this.Token = '13f44f7074ccc136cc8b948de7ac210866178526d6161536f49415664337371372d7734684b4e6d614b55447a4d4f56685064586a384f474f7475316747474963646c58374577675a5049386e54582d55494d65703168706c766e694b436f37364d61345055773d3d3a303a6a6f73655f776564736f6e5f63726f7373';
    this.ApiLocal = 'http://wedsonwebdesigner.com.br/cartola/app.php?api=';
    this.ApiCartola = 'https://api.cartolafc.globo.com/';
  }

  getApi(url:string) {
    return this.http.get(/*this.ApiLocal +*/ this.ApiCartola + url, { headers: { 'X-GLB-Token' : this.Token } });
  }
}

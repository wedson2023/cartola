import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class HttpProvider {

  private ApiLocal:string;
  private ApiCartola:string;
  private Token:string;

  constructor(
    public http: HttpClient
  ) {
    this.Token = localStorage.getItem('token') ? localStorage.getItem('token') : '18a979fbef073694b5e974b29dbd439ad48446a505a523656453853344a7039396e732d553053593163786b674256515637614d4d4f63377a394371716761344d765631395837646363503849576a62546e72576d57566b6d414563766d726846356b395f37773d3d3a303a6a6f73655f776564736f6e5f63726f7373';
    this.ApiLocal = 'http://104.236.95.250/cartola/app.php?api=';
    this.ApiCartola = 'https://api.cartolafc.globo.com/';
  }

  getApi(url:string) {
    return this.http.get(this.ApiLocal + this.ApiCartola + url, { headers: { 'X-GLB-TOKEN' : this.Token }});
  }

  setToken(token){
    this.Token = token;
  }

  getApiPost(url:string, data) {
    return this.http.post('https://login.globo.com/' + url, data);
  }
}

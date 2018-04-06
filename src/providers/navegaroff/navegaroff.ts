import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NavegaroffProvider {

  getItem(chave){
    return JSON.parse(localStorage.getItem(chave));
  }

  setItem(chave, valor){
    localStorage.setItem(chave, JSON.stringify(valor));
  }
}

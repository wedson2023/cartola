import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posicaoJogador',
})
export class PosicaoJogadorPipe implements PipeTransform {

  transform(value: Number, ...args) {
    return value == 1 ? 'GOL' : (value == 2 ? 'LAT' : (value == 3 ? 'ZAG' : (value == 4 ? 'MEI' : (value == 5 ? 'ATA' : 'TEC'))));
  }
}

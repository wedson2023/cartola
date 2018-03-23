import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PosicaoJogadorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'posicaoJogador',
})
export class PosicaoJogadorPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Number, ...args) {
    return value == 1 ? 'GOL' : (value == 2 ? 'LAT' : (value == 3 ? 'ZAG' : (value == 4 ? 'MEI' : (value == 5 ? 'ATA' : 'TEC'))));
  }
}

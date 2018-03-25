import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusJogador',
})
export class StatusJogadorPipe implements PipeTransform {

  transform(value: Number, ...args) {
    return value == 2 ? './assets/imgs/status_jogador/duvida.png' : (value == 3 ? './assets/imgs/status_jogador/suspenso.png' : (value == 5 ? './assets/imgs/status_jogador/contudido.png' : (value == 7 ? './assets/imgs/status_jogador/provavel.png' : './assets/imgs/status_jogador/nulo.png' )));
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconMenu',
})
export class IconMenuPipe implements PipeTransform {  
  transform(value: string, ...args) {
    return value == 'Destaques' ? 'star' 
    : (value == 'Mercado' ? 'cart' 
    : (value == 'Parciais' ? 'clock' 
    : (value == 'Times' ? 'football' 
    : (value == 'Ligas' ? 'trophy' 
    : (value == 'Premiação' ? 'podium' 
    : (value == 'Regulamento' ? 'paper' : null))))));
  }
}

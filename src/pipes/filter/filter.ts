import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {

    if(value == undefined || value.length === 0 || args === undefined)
    {
      return value;
    }
    
    let filter = args.toLocaleLowerCase(); 
    return value.filter(v => v.apelido.toLocaleLowerCase().indexOf(filter) != -1);
  }
}

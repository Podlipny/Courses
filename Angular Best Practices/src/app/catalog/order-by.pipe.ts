import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: true
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    console.log('Sorting')
    if (!Array.isArray(array))
     return array;

    return array.sort((x,y) => x[field] > y[field] ? 1 : x[field] < y[field] ? -1 : 0 );
  }
}

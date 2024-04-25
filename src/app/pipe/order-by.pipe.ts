import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], field: string, ascending: boolean = true): any[] {
    if (!value || !field || value.length <= 1) {
      return value;
    }
    const multiplier = ascending ? 1 : -1;
    return value.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1 * multiplier;
      } else if (a[field] > b[field]) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    });
  }

}

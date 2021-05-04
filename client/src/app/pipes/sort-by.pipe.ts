import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { IHabit } from '../interfaces/habit';

@Pipe({
  name: 'sortBy',
  pure: false
})
export class SortByPipe implements PipeTransform {

  transform(value: Array<any>, args: any[]): any {

    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    value.sort((a: any, b: any) => {

      const propertyA: number|string = this.getProperty(a, sortField);
      const propertyB: number|string = this.getProperty(b, sortField);

      if (propertyA < propertyB) {
        return -1 * multiplier;
      } else if (propertyA > propertyB) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    }
    );

    return value;
  }

  private getProperty(value: { [key: string]: any}, key: string): number|string {
    if (value == null || typeof value !== 'object') {
      return 0;
    }

    const keys: string[] = key.split('.');
    const firstKey = keys.shift();
    let result: any;

    if (firstKey !== undefined) {
      result = value[firstKey];
    }


    for (const itemKey of keys) {
      if (result === null) {
        return 0;
      }

      result = result[itemKey];
    }

    return result;
  }
}

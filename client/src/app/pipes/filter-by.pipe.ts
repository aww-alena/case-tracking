import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterByPipe implements PipeTransform {

  transform(value: any[], filterString: any, propName: string): any[] {


    const resultArray = [];

    if (value) {
      if (value.length === 0 || filterString === '' || propName === '') {
        return value;
      }

      for (const item of value) {
        if (propName === 'date') {
          if (item[propName] !==  null) {
            const itemDate = moment(item[propName]).format('YYYY-MM-DD');
            const formatFilterString = moment(filterString).format('YYYY-MM-DD');
            if (itemDate === formatFilterString) {
              resultArray.push(item);
            }
          }
        }

        const itemProp: number|string = this.getProperty(item, propName);

        if (itemProp === filterString) {
          resultArray.push(item);
        }
      }
    }

    return resultArray;
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



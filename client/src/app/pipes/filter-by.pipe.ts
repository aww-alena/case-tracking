import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterByPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {


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

        if (item[propName] === filterString) {
          resultArray.push(item);
        }
      }
    }

    return resultArray;
  }

}



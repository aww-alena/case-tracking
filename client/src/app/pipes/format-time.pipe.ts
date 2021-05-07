import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const day = 86400;
    const days = value / day;

    const strTime = (value < day) ? moment.utc(value * 1000).format('HH:mm:ss') :
    `${Math.floor(days)} days ${moment.utc((value - days) * 1000).format('HH:mm:ss')}`;

    return strTime;
  }

}

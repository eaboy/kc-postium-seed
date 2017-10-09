import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
// Blue Path
@Pipe({
    name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

    public transform(date: number): string {
        return moment(date).fromNow();
    }
 }

import { Pipe, PipeTransform } from '@angular/core';
import { formatTime } from '../../core/services/sensor.helpers';

@Pipe({ name: 'formatTime', standalone: true })
export class FormatTimePipe implements PipeTransform {
  transform(value: Date | null | undefined): string {
    if (!value) return '--:--:--';
    return formatTime(value instanceof Date ? value : new Date(value));
  }
}

import { DateTime } from 'luxon';

import { Pipe, PipeTransform } from '@angular/core';

import { DateTimeFormat } from '../types';
import { isNonEmptyValue } from '../utilities';

@Pipe({ name: 'dateTime', standalone: true })
export class DateTimePipe implements PipeTransform {
  private readonly defaultFormat: DateTimeFormat = 'MM/dd/yyyy';

  /** Transform DateTime object into a readable string. */
  public transform(
    value: DateTime | null | undefined | unknown,
    format: DateTimeFormat = this.defaultFormat,
  ): string {
    if (!isNonEmptyValue(value) || !(value instanceof DateTime)) {
      return '';
    }

    if (format === 'relative-date') {
      return this.getRelativeDate(value);
    } else if (format === 'relative-datetime') {
      return this.getRelativeDateTime(value);
    }

    return value.toFormat(format);
  }

  private getRelativeDate(value: DateTime): string {
    const relativeTime = value.toRelative();
    if (!relativeTime) {
      throw new Error(
        `There was an issue converting the datetime object "${value.toString()}" to a relative time.`,
      );
    }

    const now = DateTime.local();
    const hoursDiff = now.diff(value).as('hours');

    if (hoursDiff < 24) {
      return 'Today';
    } else if (hoursDiff < 48) {
      return 'Yesterday';
    } else if (hoursDiff > 168) {
      return value.toFormat(this.defaultFormat);
    }

    return relativeTime;
  }

  private getRelativeDateTime(value: DateTime): string {
    const time = value.toFormat('h:mm a');
    return `${this.getRelativeDate(value)}, ${time}`;
  }
}

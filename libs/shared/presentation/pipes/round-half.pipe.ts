import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roundHalfWithYears', standalone: true })
export class RoundHalfWithYearsPipe implements PipeTransform {
  transform(value: number): string {
    const rounded = Math.floor(value * 2) / 2;

    const numberPart = Number.isInteger(rounded)
      ? `${rounded}`
      : rounded.toFixed(1);

    const suffix = rounded === 1 ? 'year' : 'years';

    return `${numberPart} ${suffix}`;
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-calendar-icon',
  imports: [CommonModule],
  templateUrl: './calendar-icon.html',
  styleUrl: './calendar-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarIcon {
  width = input.required<number>();
  height = input.required<number>();
}

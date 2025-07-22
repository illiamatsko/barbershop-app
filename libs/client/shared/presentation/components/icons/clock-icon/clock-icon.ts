import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-clock-icon',
  imports: [CommonModule],
  templateUrl: './clock-icon.html',
  styleUrl: './clock-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockIcon {
  width = input.required<number>();
  height = input.required<number>();
}

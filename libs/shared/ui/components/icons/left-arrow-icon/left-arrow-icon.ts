import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-left-arrow-icon',
  imports: [CommonModule],
  templateUrl: './left-arrow-icon.html',
  styleUrl: './left-arrow-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftArrowIcon {
  width = input.required<number>();
  height = input.required<number>();
}

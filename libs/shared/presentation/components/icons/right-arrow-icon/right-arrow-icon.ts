import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-right-arrow-icon',
  imports: [CommonModule],
  templateUrl: './right-arrow-icon.html',
  styleUrl: './right-arrow-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightArrowIcon {
  width = input.required<number>();
  height = input.required<number>();
}

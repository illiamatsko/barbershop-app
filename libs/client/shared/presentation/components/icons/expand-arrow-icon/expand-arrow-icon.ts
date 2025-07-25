import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-expand-arrow-icon',
  imports: [CommonModule],
  templateUrl: './expand-arrow-icon.html',
  styleUrl: './expand-arrow-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandArrowIcon {
  width = input.required<number>();
  height = input.required<number>();
  isOpen = input.required<boolean>();
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-scissors-icon',
  imports: [CommonModule],
  templateUrl: './scissors-icon.html',
  styleUrl: './scissors-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScissorsIcon {
  width = input.required<number>();
  height = input.required<number>();
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-logo-icon',
  imports: [CommonModule],
  templateUrl: './logo-icon.html',
  styleUrl: './logo-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoIcon {
  width = input.required<number>();
  height = input.required<number>();
}

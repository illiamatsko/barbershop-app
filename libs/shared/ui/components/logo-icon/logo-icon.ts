import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-logo-icon',
  imports: [CommonModule],
  templateUrl: './logo-icon.html',
  styleUrl: './logo-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoIcon {}

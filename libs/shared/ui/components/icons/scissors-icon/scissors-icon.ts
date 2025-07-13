import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-scissors-icon',
  imports: [CommonModule],
  templateUrl: './scissors-icon.html',
  styleUrl: './scissors-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScissorsIcon {}

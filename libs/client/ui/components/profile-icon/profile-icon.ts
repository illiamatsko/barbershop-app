import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-profile-icon',
  imports: [CommonModule],
  templateUrl: './profile-icon.html',
  styleUrl: './profile-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileIcon {}

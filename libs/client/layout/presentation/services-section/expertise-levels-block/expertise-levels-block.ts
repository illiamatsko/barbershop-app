import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberStatusCard } from './barber-status-card/barber-status-card';


@Component({
  selector: 'app-expertise-levels-block',
  imports: [CommonModule, BarberStatusCard],
  templateUrl: './expertise-levels-block.html',
  styleUrl: './expertise-levels-block.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertiseLevelsBlock {}

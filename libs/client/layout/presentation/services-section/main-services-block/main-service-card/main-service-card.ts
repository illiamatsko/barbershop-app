import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewDirective } from '@barbershop-app/shared/ui';


@Component({
  selector: 'app-main-service-card',
  imports: [CommonModule, InViewDirective],
  templateUrl: './main-service-card.html',
  styleUrl: './main-service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainServiceCard {}

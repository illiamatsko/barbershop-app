import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-additional-service-card',
  imports: [CommonModule],
  templateUrl: './additional-service-card.html',
  styleUrl: './additional-service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServiceCard {

}

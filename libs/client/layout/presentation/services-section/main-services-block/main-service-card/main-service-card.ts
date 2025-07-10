import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main-service-card',
  imports: [CommonModule],
  templateUrl: './main-service-card.html',
  styleUrl: './main-service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainServiceCard {

}

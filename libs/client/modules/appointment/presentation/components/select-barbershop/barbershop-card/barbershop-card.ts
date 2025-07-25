import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BarbershopDto } from '@barbershop-app/shared/domain';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-barbershop-card',
  imports: [NgClass],
  templateUrl: './barbershop-card.html',
  styleUrl: './barbershop-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarbershopCard {
  barbershop = input.required<BarbershopDto>();
  isSelected = input.required<boolean>();
}

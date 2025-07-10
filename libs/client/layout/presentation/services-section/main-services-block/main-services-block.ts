import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainServiceCard } from './main-service-card/main-service-card';


@Component({
  selector: 'app-main-services-block',
  imports: [CommonModule, MainServiceCard],
  templateUrl: './main-services-block.html',
  styleUrl: './main-services-block.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainServicesBlock {}

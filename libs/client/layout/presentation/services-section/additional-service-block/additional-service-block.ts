import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalServiceCard } from './additional-service-card/additional-service-card';


@Component({
  selector: 'app-additional-service-block',
  imports: [CommonModule, AdditionalServiceCard],
  templateUrl: './additional-service-block.html',
  styleUrl: './additional-service-block.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServiceBlock {}

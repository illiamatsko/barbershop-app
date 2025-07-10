import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-services-section',
  imports: [CommonModule],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection {

}

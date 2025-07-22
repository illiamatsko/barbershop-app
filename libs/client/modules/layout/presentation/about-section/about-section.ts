import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { InViewDirective } from '@barbershop-app/client/shared/presentation';


@Component({
  selector: 'app-about-section',
  imports: [NgOptimizedImage, InViewDirective],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSection {
  imgUrl = 'v1753200001/about-section_cdearf.avif'
}

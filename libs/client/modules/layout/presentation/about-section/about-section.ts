import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { InViewDirective } from '../../../../shared';


@Component({
  selector: 'app-about-section',
  imports: [NgOptimizedImage, InViewDirective],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSection {}

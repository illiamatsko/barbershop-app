import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSection } from '../hero-section/hero-section';
import { AboutSection } from '../about-section/about-section';
import { BarbersSection } from '../barbers-section/barbers-section';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, HeroSection, AboutSection, BarbersSection],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {}

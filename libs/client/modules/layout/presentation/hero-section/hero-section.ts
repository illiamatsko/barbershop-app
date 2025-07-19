import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Header } from '../header/header';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-hero-section',
  imports: [Header, NgStyle],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection implements AfterViewInit, OnDestroy {
  backgroundImg =
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

  get backgroundStyle() {
    return { 'background-image': `url(${this.backgroundImg})` };
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  private onScroll = () => {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.getElementById('parallax-bg');
    const heroSection = document.getElementById('hero');

    if (parallaxBg && heroSection) {
      const heroHeight = heroSection.offsetHeight;

      if (scrolled < heroHeight) {
        const yPos = scrolled * 0.5;
        parallaxBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    }
  };
}

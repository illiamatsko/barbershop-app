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
    'https://res.cloudinary.com/dx7xjflm0/image/upload/v1753197217/hero-section_nhyjmf.avif';

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

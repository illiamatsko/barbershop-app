import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input
} from '@angular/core';

@Directive({
  selector: '[appInView]',
})
export class InViewDirective implements AfterViewInit {
  @Input('appInView') delay = '0s'; // затримка у секундах

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(this.el.nativeElement, 'animationDelay', this.delay);
          this.renderer.addClass(this.el.nativeElement, 'animate-fade-in-up');

          const delayMs = parseFloat(this.delay) * 1000;
          setTimeout(() => {
            this.renderer.removeClass(this.el.nativeElement, 'opacity-0');
          }, delayMs);

          observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(this.el.nativeElement);
  }
}

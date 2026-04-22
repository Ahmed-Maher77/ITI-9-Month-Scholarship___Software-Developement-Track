import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy {
  private readonly totalSlides = 3;
  currentIndex = signal(0);
  intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  goTo(index: number) {
    this.currentIndex.set(index);
    this.resetAutoSlide();
  }

  prev() {
    const current = this.currentIndex();
    this.currentIndex.set(current === 0 ? this.totalSlides - 1 : current - 1);
    this.resetAutoSlide();
  }

  next() {
    const current = this.currentIndex();
    this.currentIndex.set(current === this.totalSlides - 1 ? 0 : current + 1);
    this.resetAutoSlide();
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.intervalId = setInterval(() => {
      this.advanceSlide();
    }, 3000);
  }

  stopAutoSlide() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  advanceSlide() {
    const current = this.currentIndex();
    this.currentIndex.set(current === this.totalSlides - 1 ? 0 : current + 1);
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}

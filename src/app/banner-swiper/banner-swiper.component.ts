import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-swiper',
  templateUrl: './banner-swiper.component.html',
  styleUrl: './banner-swiper.component.scss'
})
export class BannerSwiperComponent implements OnInit {
  images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
  currentSlide = 0;

  ngOnInit() {
   this.startAutoPlay();
  }

  startAutoPlay() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }, 3000); // Change 3000 to the desired auto-play interval in milliseconds
  }
}
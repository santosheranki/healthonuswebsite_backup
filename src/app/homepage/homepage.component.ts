import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BannerSwiperComponent } from '../banner-swiper/banner-swiper.component';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  images!: string[];
  showCarousel = true;
  currentSlide = 0;
  metadata: any;
  environment: Environment | null = null;
  constructor(private router: Router, private meta: Meta, private title: Title, private metadataService: MetadataserviceService, private init: AppInitService) {
    this.environment = init.config
  }
  ngOnInit() {
    const currentPage = "Home";
    this.metadataService.getMetadata(currentPage).subscribe(metadata => {
      this.metadata = metadata;
    });
    this.title.setTitle(this.metadata?.title);
    this.meta.addTags([
      {
        name: 'keywords',
        content: this.metadata?.keywords
      },
      {
        name: 'description', content: this.metadata?.description
      },

    ]);
    this.startAutoPlay();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/home') {
      }
    });
  }
  startAutoPlay() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images?.length;
    }, 3000);
  }
  navigateaboutus() {
  }
  playStore() {
    window.open("https://link.healthonus.io/gMfKGj")
  }

  redirectToHealthOnUs() {
    window.location.href = 'https://healthonus.io';
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    autoplaySpeed: 500,
    autoplayTimeout: 2000,
    autoplay: true,
    pullDrag: false,
    dots: true,
    navSpeed: 200,
    navText: ['<i class="fa-solid fa-angle-left" style="color: #ffffff;"></i>', '<i class="fa-solid fa-angle-right" style="color: #ffffff;"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      760: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
    nav: true,
  };
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    autoplaySpeed: 500,
    autoplayTimeout: 2000,
    autoplay: true,
    pullDrag: false,
    dots: false,
    navSpeed: 200,
    navText: ['<i class="fa-solid fa-arrow-left fa-xl"></i>', '<i class="fa-solid fa-arrow-right fa-xl"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      760: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
    // nav: true,
  };
}
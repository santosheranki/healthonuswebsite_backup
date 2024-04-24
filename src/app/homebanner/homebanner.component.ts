import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppInitService } from '../services/appinit.service';
import { Environment } from '../models/environment';

@Component({
  selector: 'app-homebanner',
  templateUrl: './homebanner.component.html',
  styleUrl: './homebanner.component.scss'
})
export class homeBannerComponent implements OnInit {
  environment: Environment | null = null;

  constructor(private route: Router,
    private init: AppInitService) {
    this.environment = init.config
  }
  ngOnInit() {
  }
  carouselOptions: OwlOptions = {
    items: 1,
    loop: true,
    margin: 10,
    autoplay: true,
    dotsData: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    pullDrag: true,
    // autoplaySpeed: 5000,
    dots: true,
    navSpeed: 8000,
    // autoplayTimeout: 5000,
    navText: ['<i class="fa-solid fa-angle-left fa-xl"></i>', '<i class="fa-solid fa-angle-right fa-xl"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  };
  contactus() {
    this.route.navigate(['/contact-us']);
  }
}
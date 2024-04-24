import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit, VERSION } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';
import { Router } from '@angular/router';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent implements OnInit {
  metadata: any;
  environment: Environment | null = null;
  constructor(private title: Title, private meta: Meta, private metadataService: MetadataserviceService, private route: Router, private serv: AppInitService) {
    this.environment = serv.config
  }
  ngOnInit(): void {
    const currentPage = "AboutUs";
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
  }
  name = 'Angular ';
  customOptions: OwlOptions = {
    // loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['<i class="fa-solid fa-angle-left fa-xl"></i>', '<i class="fa-solid fa-angle-right fa-xl"></i>'],
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
}

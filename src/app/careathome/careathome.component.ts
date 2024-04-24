import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-careathome',
  templateUrl: './careathome.component.html',
  styleUrl: './careathome.component.scss'
})
export class careathomeComponent implements OnInit {
  metadata: any;
  constructor(private title: Title, private meta: Meta, private metadataService: MetadataserviceService) {

  }
  ngOnInit(): void {
    const currentPage = "CareAtHome";
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



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplaySpeed: 200,
    autoplayTimeout: 2000,
    autoplay: true,
    dots: true,
    navSpeed: 200,
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
  };

  images = [
    '../../assets/careathome/nurseholdinghand.png',
    '../../assets/careathome/doctorwithpatientleg.png',
    '../../assets/careathome/holdingtablets.png'
  ];

}

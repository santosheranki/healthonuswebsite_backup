import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';

@Component({
  selector: 'app-in-homephysiotherapy',
  templateUrl: './in-homephysiotherapy.component.html',
  styleUrl: './in-homephysiotherapy.component.scss'
})
export class InHomephysiotherapyComponent implements OnInit {
  metadata: any;
  constructor(private scroller: ViewportScroller, private title: Title, private meta: Meta, private metadataService: MetadataserviceService) { }
  enquirenow() {
    this.scroller.scrollToAnchor('downloadsection')
  }
  playStore() {
    window.open("https://link.healthonus.io/gMfKGj")
  }
  ngOnInit(): void {
    const currentPage = "InHomePhysiotherapy";
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
}

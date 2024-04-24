import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MetadataserviceService } from '../../services/metadataservice.service';

@Component({
  selector: 'app-whyus',
  templateUrl: './whyus.component.html',
  styleUrl: './whyus.component.scss'
})
export class WhyusComponent implements OnInit {
  metadata: any;
  constructor(private title: Title, private meta: Meta, private metadataService: MetadataserviceService) {

  }
  ngOnInit(): void {
    const currentPage = "WhyUs";
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

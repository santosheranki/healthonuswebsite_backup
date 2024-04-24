import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';

@Component({
  selector: 'app-physiotherapy',
  templateUrl: './physiotherapy.component.html',
  styleUrl: './physiotherapy.component.scss'
})
export class PhysiotherapyComponent {
  metadata: any;
  constructor(private title: Title, private meta: Meta, private metadataService: MetadataserviceService) {

  }
  ngOnInit(): void {
    const currentPage = "Physiotherapy";
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

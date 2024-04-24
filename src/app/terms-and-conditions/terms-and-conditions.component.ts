import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent implements OnInit {
  metadata: any;
  constructor(private meta: Meta, private title: Title, private metadataservice: MetadataserviceService) { }
  ngOnInit(): void {
    const currentPage = "tandc";
    this.metadataservice.getMetadata(currentPage).subscribe(metadata => {
      this.metadata = metadata;
    });
    this.title.setTitle(this.metadata?.Title);
    this.meta.addTags([
      {
        name: 'keywords',
        content: this.metadata?.keywords,
      },
      {
        name: 'description',
        content: this.metadata?.description
      },
    ]);
  }
}
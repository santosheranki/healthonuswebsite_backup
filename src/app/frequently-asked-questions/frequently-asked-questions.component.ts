import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';

@Component({
  selector: 'app-frequently-asked-questions',
  templateUrl: './frequently-asked-questions.component.html',
  styleUrl: './frequently-asked-questions.component.scss'
})
export class FrequentlyAskedQuestionsComponent implements OnInit {
  metadata: any;
  constructor(private meta: Meta, private title: Title, private metadataservice: MetadataserviceService) { }
  ngOnInit(): void {
    const currentPage = "Faqs";
    this.metadataservice.getMetadata(currentPage).subscribe(metadata => {
      this.metadata = metadata;
    });
    this.title.setTitle(this.metadata?.Title);
    this.meta.addTags([
      {
        name: 'keywords',
        content: this.metadata?.keywords
      },
      {
        name: 'description',
        content: this.metadata?.description
      },
    ]);
  }
}
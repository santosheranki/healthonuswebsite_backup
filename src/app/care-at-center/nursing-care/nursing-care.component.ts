import { Component, OnInit } from '@angular/core';
import { MetadataserviceService } from '../../services/metadataservice.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nursing-care',
  templateUrl: './nursing-care.component.html',
  styleUrl: './nursing-care.component.scss'
})
export class NursingCareComponent implements OnInit {
  metadata: any;
  constructor(private metadataService: MetadataserviceService, private title: Title, private meta: Meta) { }
  ngOnInit(): void {
    const currentPage = "NursingCare";
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

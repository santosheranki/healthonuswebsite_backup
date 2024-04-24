import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../services/master.service';
import { ToastrService } from 'ngx-toastr';
import { Title, Meta } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';
@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss',
})
export class CareersComponent {
  showOpenings: boolean = false;
  Designation: any;
  searchnotfound: any;
  jobPositions: any[] = [];
  metadata: any;
  environment: Environment | null = null;
  isNavigated!: boolean;
  constructor(
    private scroller: ViewportScroller,
    private route: Router,
    private masterService: MasterService,
    private toastr: ToastrService,
    private title: Title,
    private meta: Meta,
    private metadataService: MetadataserviceService,
    private serv: AppInitService
  ) {
    this.environment = serv.config;
  }
  searchText: any = '';
  itemsPerPage: number = 4; // Number of items to display per page
  currentPage: number = 1;
  searchResults: any[] = [];
  search(): void {
    if (this.searchText?.length > 1) {
      console.log('jobpositions', this.jobPositions);
      this.searchResults = this.jobPositions?.filter(
        (item) =>
          item?.Title?.toLowerCase()?.includes(
            this.searchText?.toLowerCase()
          ) ||
          item?.Designation?.toLowerCase()?.includes(
            this.searchText?.toLowerCase()
          )
      );
    } else {
      this.searchnotfound = this.jobPositions;
      this.searchResults = this.jobPositions;
    }
  }
  openings() {
    this.scroller.scrollToAnchor('showOpenings');
    this.showOpenings = true;
  }
  ngOnInit() {
    this.GetAllJobPositions();
    const currentPage = 'Careers';
    this.metadataService.getMetadata(currentPage).subscribe((metadata) => {
      this.metadata = metadata;
    });
    this.title.setTitle(this.metadata?.title);
    this.meta.addTags([
      {
        name: 'keywords',
        content: this.metadata?.keywords,
      },
      {
        name: 'description',
        content: this.metadata?.description,
      },
    ]);
    setTimeout(() => {
      if (history?.state.jobs === 'jobs' && !this.isNavigated) {
        this.isNavigated = true;
        this.scroller.scrollToAnchor('wearehiring');
      }
    }, 10)
  }
  // ngDoCheck() {
  //   if (history?.state.jobs === 'jobs' && !this.isNavigated) {
  //     console.log("enteredddddd");
  //     this.isNavigated = true;
  //     this.scroller.scrollToAnchor('wearehiring');
  //   }
  // }
  openRoles() {
    this.showOpenings = true;
    setTimeout(() => {
      if ((this.showOpenings = true)) {
        this.scroller.scrollToAnchor('showOpenings');
      }
    });
  }
  navigateaboutus() {
    this.route.navigate(['/about-us']);
  }
  getintouch() {
    this.route.navigate(['/contact-us']);
  }
  GetAllJobPositions() {
    this.masterService.GetAllJobPositions().subscribe(
      (result: any[]) => {
        this.jobPositions = result;
        this.searchResults = result;
        this.Designation = result;
      },
      (error) => {
        this.toastr.error('Failed to Fetch', 'Failed!', {
          timeOut: 5000,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      }
    );
  }
  applyNow(jobId: string) {
    this.route.navigate(['/job'], { queryParams: { id: jobId } });
  }
  isLastItem(item: any): boolean {
    const paginatedResults = this.getPaginatedResults();
    return item === paginatedResults[paginatedResults.length - 1];
  }
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.scroller.scrollToAnchor("wearehiring")
  }
  getPaginatedResults(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.itemsPerPage,
      this.searchResults.length
    );
    return this.searchResults.slice(startIndex, endIndex);
  }
  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
  hasNextPage(): boolean {
    const totalPages = Math.ceil(this.searchResults.length / this.itemsPerPage);
    return this.currentPage < totalPages;
  }
  truncateSummary(summary: string): string {
    const maxLength = 120;  // Maximum length of the summary
    if (summary && summary.length > maxLength) {
      return summary.substring(0, maxLength) + '...';
    }
    return summary;
  }
  btnclick() {
    this.scroller.scrollToAnchor('wearehiring');
  }
}

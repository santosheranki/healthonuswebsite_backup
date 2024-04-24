import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { NavigationEnd, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';
import { Title, Meta } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';
@Component({
  selector: 'app-care-at-home-pharma',
  templateUrl: './care-at-home-pharma.component.html',
  styleUrl: './care-at-home-pharma.component.scss'
})
export class CareAtHomePharmaComponent implements OnInit {
  display: boolean = false;
  splittedEvnt: any;
  selectedTab: string = 'Pharmacy';
  environment: Environment | null = null;
  metadata: any;
  constructor(private modalService: ModalService, private router: Router, private scroller: ViewportScroller, private serv: AppInitService,
    private metadataService: MetadataserviceService,private title: Title, private meta: Meta
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let evntOccured = event.urlAfterRedirects;
        this.splittedEvnt = evntOccured?.split("/")?.[1];
      }
    });
    this.environment = serv.config;
  }
  ngOnInit() {
    const currentPage = "Pharmacy";
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
    this.modalService.showModal$.subscribe((showModal: boolean) => {
      this.display = showModal;
    });
    const menuItems = document.querySelectorAll("#centeredul ul li");
    console.log("menuItems",menuItems)
    menuItems.forEach((individualItems: any) => {
      const itemContent = individualItems?.innerText;
      if (this.splittedEvnt == 'care-at-home-pharma' && itemContent === 'Pharmacy') {
        individualItems?.classList?.add('activebackground');
      }
      else {
        individualItems?.classList.add('notactivebackground')
      }
    })
  }
  popupopen() {
    this.display = true;;
  }
  homecarenurse() {
    this.router.navigate(['/homecare-services/nursing']);
  }
  homecarephysio() {
    this.router.navigate(['/homecare-services/physiotherapy']);
  }
  self() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  selectTab(tab: string) {
    this.selectedTab = tab;
    if (window.innerWidth <= 576) {
      if (tab) {
        setTimeout(() => {
          this.scroller.scrollToAnchor(tab);
        }, 10)
      }
    }
  }
}

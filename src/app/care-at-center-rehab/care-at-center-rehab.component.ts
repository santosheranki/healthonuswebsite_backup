import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { NavigationEnd, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';
import { Title, Meta } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';

@Component({
  selector: 'app-care-at-center-rehab',
  templateUrl: './care-at-center-rehab.component.html',
  styleUrl: './care-at-center-rehab.component.scss'
})
export class CareAtCenterRehabComponent implements OnInit {
  display: boolean = false;
  splittedEvnt: any;
  selectedTab: string = 'orthoskeletal';
  environment: Environment | null = null;
  metadata: any;
  constructor(private modalService: ModalService, private router: Router, private scroller: ViewportScroller, private serv: AppInitService,
    private metadataService: MetadataserviceService,private title: Title, private meta: Meta
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let evntOccured = event.urlAfterRedirects;
        this.splittedEvnt = evntOccured?.split("/")?.[1];
        console.log("splittedEvnt", this.splittedEvnt)
      }
    });
    this.environment = serv.config;
  }
  ngOnInit() {
    const currentPage = "CenterPhysiotherapyAndRehab";
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
    menuItems.forEach((individualItems: any) => {
      const itemContent = individualItems?.innerText;
      if (this.splittedEvnt == 'care-at-center-rehab' && itemContent === 'Physiotherapy & Rehab') {
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
  self() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  transcare() {
    this.router.navigate(['/post-hospitalization-care/transition-care']);
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

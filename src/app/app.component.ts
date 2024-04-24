import { Component, Inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ModalService } from './services/modal.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showloader: boolean = false;
  homeroute: boolean = false;
  shownewpopup: string = '';
  showHomeModal: boolean = false;
  browserRefresh: boolean = false;
  constructor(private router: Router, @Inject('AOS_INSTANCE') private aos: any, private modalSer: ModalService) {
    this.browserRefresh = performance.navigation.type === 1;
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showloader = true;
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.showloader = false;
        }, 1500);
        this.homeroute = event.urlAfterRedirects === '/home';
        if (this.homeroute === false) {
          this.showHomeModal = true;
        }
        if (this.browserRefresh === false) {
          this.showHomeModal = true;
        }
        if (event.urlAfterRedirects !== "/home") {
          this.showHomeModal = false;
        }
      }
    });
  }

}


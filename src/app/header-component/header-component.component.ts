import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  GuardsCheckStart,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  RoutesRecognized,
} from '@angular/router';
import { AppInitService } from '../services/appinit.service';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { ModalService } from '../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Environment } from '../models/environment';
@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss'],
})
export class HeaderComponentComponent implements OnInit {
  windowScrolled: any;
  contactForm!: FormGroup;
  showModalenquire: any;
  isNavbarDropdownOpen: string | null = null;
  showModal: any;
  ageNumbers: number[] = Array.from({ length: 83 }, (_, index) => index + 18);
  display: boolean = false;
  futureleadersremove: any;
  selectedNavItem: number | null = null;
  environment: Environment | null = null;
  constructor(
    private router: Router,
    private modalService: ModalService,
    private fb: FormBuilder,
    private serv: AppInitService,
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.contactForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/),
        ],
      ],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      location: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$'
          ),
        ],
      ],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      message: ['', Validators.required],
      termsCheckbox: ['', Validators.required],
    });
    this.environment = serv.config;
  }
  ngOnInit(): void {
    this.modalService.showModal$.subscribe((showModal: boolean) => {
      this.display = showModal;
    });
    this.router.events.subscribe((ev) => {
      if (ev instanceof RoutesRecognized) {
        let state = ev?.state;
        let child = state?.root?.children?.[0];
        let mainparent = child?.data?.['parent'];
        this.updateactive(mainparent);
      }
      if (ev instanceof NavigationEnd) {
        this.updateActiveNavItem(ev);
      }
    });
  }
  onNavItemClicked(index: number): void {
    this.selectedNavItem = index;
  }
  private updateactive(ev: any) {
    const navbarAllItems = document.querySelectorAll(
      '#navbarSupportedContent ul li a'
    );
    navbarAllItems?.forEach((singleitems: any) => {
      const attr = singleitems.getAttribute('ng-reflect-router-link');
      let attrsplit = attr?.split('/');
      if (attrsplit?.[1] === ev) {
        setTimeout(() => {
          singleitems?.classList?.add('actives');
        });
      }
    });
  }
  private updateActiveNavItem(ev: any): void {
    const menuItems = document.querySelectorAll(
      '#navbarSupportedContent ul li a'
    );
    menuItems?.forEach((item: any) => {
      item.classList.remove('actives');
    });
    menuItems?.forEach((item: any) => {
      const cHref = item.getAttribute('href');
      if (cHref === location?.pathname) {
        item?.classList?.add('actives');
        let prtNode = item?.parentNode?.parentNode?.parentNode?.firstChild;
        if (prtNode?.nodeName?.toLowerCase() == 'a') {
          prtNode.classList.add('actives');
        }
      }
    });
  }
  scrollToAnchor(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  closeModal() {
    this.showModal = false;
  }
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey() {
    this.closeModal();
  }
  showModalenquiry() {
    this.modalService.showModal = true;
  }
  showfeed() {
    console.log("showfeed clicked", this.modalService.showfeedback = true);
    this.modalService.showfeedback = true
  }
  // closeNav() {
  //   const navbars = document.querySelector('.navbar-collapse');
  //   console.log("navbars", navbars);
  //   if (navbars?.classList.contains('show')) {
  //     navbars.classList.remove('show');
  //   }
  // }
  toggleNavbarDropdown(menu: string): void {
    if (this.isNavbarDropdownOpen === menu) {
      this.isNavbarDropdownOpen = null; // Close the dropdown if it's already open
    } else {
      this.isNavbarDropdownOpen = menu; // Open the dropdown
    }
  }
  closeNav(): void {
    const navbar: any = document.querySelector('.navbar-collapse');
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
    this.isNavbarDropdownOpen = null; // Close any open dropdown when navbar is closed
  }
}

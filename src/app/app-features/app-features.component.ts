import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Aos from 'aos';
import { ModalService } from '../services/modal.service';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';

@Component({
  selector: 'app-app-features',
  templateUrl: './app-features.component.html',
  styleUrl: './app-features.component.scss'
})
export class AppFeaturesComponent implements OnInit {
  display: boolean = false;
  selectedAccordion: string = 'healthRecords';
  environment: Environment | null = null;
  constructor(private modalService: ModalService, private serv: AppInitService) {
    this.environment = serv.config;
  }
  ngOnInit() {
    this.modalService.showModal$.subscribe((showModal: boolean) => {
      this.display = showModal;
    });
  }
  popupopen() {
    this.display = true;
  }
  ngAfterViewInit() {
    Aos.init();
  }
  toggleAccordion(accordion: string): void {
    this.selectedAccordion = (this.selectedAccordion === accordion) ? '' : accordion;
  }
}
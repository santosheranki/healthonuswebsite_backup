import { Component, OnInit } from '@angular/core';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';
import { ModalService } from '../services/modal.service';
@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrl: './footer-component.component.scss'
})
export class FooterComponentComponent implements OnInit {
  currentYear: any;
  display: boolean = false;
  environment: Environment | null = null;
  constructor(private serv: AppInitService, private modalService: ModalService) {
    this.currentYear = new Date().getFullYear();
    this.environment = serv.config
  }
  ngOnInit() {
    this.modalService.showModal$.subscribe((showModal: boolean) => {
      this.display = showModal;
    });
  }
  showfeed() {
    console.log("showfeed clicked", this.modalService.showfeedback = true);
    this.modalService.showfeedback = true
  }
}
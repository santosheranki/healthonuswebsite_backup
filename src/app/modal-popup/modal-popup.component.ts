import { Component, HostListener } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrl: './modal-popup.component.scss'
})
export class ModalPopupComponent {
  showModal: boolean = true;
  environment: Environment | null = null;
  constructor(private modalService: ModalService, private serv: AppInitService) {
    this.environment = serv.config;
  }
  closeModal() {
    this.modalService.toggleModal(false);
  }
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey() {
    this.closeModal();
  }
}
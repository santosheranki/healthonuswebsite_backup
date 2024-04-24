import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  images: string[] = [
    '../../assets/sankranthi_1.jpg',
    '../../assets/sankranthi_2.jpg',
    '../../assets/sankranthi_3.jpg',
    '../../assets/sankranthi_4.jpg',
    '../../assets/sankranthi_4.jpg',
    '../../assets/sankranthi_4.jpg',
    '../../assets/Ugadi_1.JPG',
    '../../assets/Ugadi_2.JPG',
    '../../assets/Ugadi_3.JPG',
    '../../assets/Ugadi_4.JPG',
    '../../assets/Ugadi_5.JPG',
    '../../assets/Ugadi_6.JPG'
  ];
  currentImageIndex: number = 0;
  showModal: boolean = false;
  constructor(private modalService: ModalService) { }
  ngOnInit(): void {
  }
  openModal(index: number): void {
    console.log("indexxxxxxxx", index);
    this.currentImageIndex = index;
    console.log("this.currentimageindex", this.currentImageIndex, "indexat27", index);
    this.showModal = true;
    console.log("this.sjowmodal", this.showModal);
  }

  closeModal(): void {
    this.showModal = false;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }
}
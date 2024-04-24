import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../services/master.service';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.scss'
})
export class EnquiryComponent implements OnInit {
  showform: boolean = true;
  showsuccess: boolean = false;
  showerror: boolean = false;
  showspinner: boolean = false;
  existinguser: boolean = false;
  comments: string = "";
  environment: Environment | null = null;
  contactForm!: FormGroup;
  ageNumbers: number[] = Array.from({ length: 83 }, (_, index) => index + 18);
  constructor(private fb: FormBuilder, private router: Router, private route: Router, public modalService: ModalService, private master: MasterService, private serv: AppInitService) {
    this.contactForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      age: [0, [Validators.required]],
      location: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      service: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      comments: [''],

    });
    this.environment = serv.config
  }
  showModal: string = '';
  ngOnInit() {
    this.contactForm.reset({
      gender: 0,
      age: 0,
      location: 0,
      service: 0
    });
  }
  closeModal() {
    console.log(this.contactForm.controls['age'].value)
    this.modalService.showModal = false;
    this.contactForm.reset({
      gender: 0,
      age: 0,
      location: 0,
      service: 0
    });

    localStorage.setItem('showModal', '')
    this.showform = true;
    this.showsuccess = false;
    this.showerror = false;
    this.showsuccess = false;
    this.showspinner = false;
    this.existinguser = false;
  }
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey() {
    this.closeModal();
  }

  retryenquiry() {
    this.showerror = false;
    this.showform = true;
  }

  onSubmit() {
    this.showspinner = true;
    const enqpayload = {
      firstName: this.contactForm.value?.firstname,
      lastName: this.contactForm.value?.lastname,
      mobile: this.contactForm.value?.phonenumber,
      email: this.contactForm.value?.email,
      age: parseInt(this.contactForm.value?.age),
      gender: this.contactForm.value?.gender,
      location: this.contactForm.value?.location,
      service: this.contactForm?.value.service,
      comments: this.contactForm?.value?.comments
    }

    this.master.AddEnquiry(enqpayload).subscribe((result: any) => {
      try {
        if (result === 1) {
          this.showspinner = true;
          this.showform = false;
          this.showsuccess = true;
          this.contactForm.reset();
        }
        else if (result === 0) {
          this.showsuccess = false;
          this.showform = false;
          this.existinguser = true;
        }
        else {
          this.showsuccess = false;
          this.showform = false;
          this.showerror = true;
        }
      } catch (error) {
        this.showsuccess = false;
        this.showform = false;
        this.showerror = true;
      }
    })
  }

  phonePattern(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  NamePattern(event: KeyboardEvent) {
    const pattern = /[a-zA-Z ]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }


}

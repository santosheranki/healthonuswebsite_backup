import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../services/master.service';
import { ToastrService } from 'ngx-toastr';
import { Title, Meta } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {
  contactForm: FormGroup;
  spinner: boolean = false;
  subscribeForm: FormGroup;
  errMsg: boolean = false;
  errSubMsg: boolean = false;
  emailQueryParam: string = '';
  metadata: any;
  environment: Environment | null = null;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private scroller: ViewportScroller, private masterService: MasterService, private toastr: ToastrService,
    private title: Title, private meta: Meta, private metadataService: MetadataserviceService, private serv: AppInitService) {
    this.contactForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      message: ['', Validators.required],
      termsCheckbox: ['', Validators.required]
    });
    this.subscribeForm = this.fb.group({
      subscribeEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
    });
    this.environment = serv.config;
  }
  ngOnInit() {
    const currentPage = "ContactUS";
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
    this.route.queryParams.subscribe((params) => {
      this.emailQueryParam = params['email'];
      if (this.emailQueryParam != null || this.emailQueryParam != undefined) {
        this.scroller.scrollToAnchor('targetEmail');
      }
    })
  }
  onSubmit() {
    let addcontactpayload = {
      FirstName: this.contactForm?.value?.firstname,
      LastName: this.contactForm?.value?.lastname,
      Email: this.contactForm?.value?.email,
      PhoneNumber: this.contactForm?.value?.phonenumber,
      Message: this.contactForm?.value?.message
    }
    if (this.contactForm.valid) {
      this.spinner = true
      this.masterService.AddContact(addcontactpayload).subscribe((response: any) => {
        if (response) {
          this.spinner = false;
          this.toastr.success("Message Sent Successfully", "Success!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" });
          this.contactForm.reset();
        }
      }, (error) => {
        this.spinner = false;
        this.toastr.error("Failed to Send", "Failed!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" });

      })
    } else {
      this.contactForm.markAllAsTouched();
      this.errMsg = true;
    }
  }
  onsubscribeSubmit() {
    let subscribepayload = {
      email: this.subscribeForm?.value?.subscribeEmail
    }
    if (this.subscribeForm.valid) {
      this.spinner = true;
      this.masterService.AddSubscriber(subscribepayload).subscribe((response: any) => {
        if (response) {
          this.spinner = false;
          this.subscribeForm.reset();
          this.toastr.success("Subscribed Successfully", "Success!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" });
        }
      }, (error) => {
        this.spinner = false;
        this.toastr.error("Failed to Subscribe", "Failed!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" });
      })
    }
    else {
      this.errSubMsg = true;
      this.subscribeForm.markAllAsTouched();
    }
  }
  phonePattern(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  playStore() {
    window.open("https://link.healthonus.io/gMfKGj")
  }
  sendEmail() {
    const emailAddress = 'contactus@healthonus.io';
    const mailtoLink = `mailto:${emailAddress}`;
    window.location.href = mailtoLink;
  }
  openhyd() {
    window.open("https://maps.app.goo.gl/3GGCHSugaigPUws18");
  }
  openvzg() {
    window.open("https://maps.app.goo.gl/tWMGstSufvp4uKPn7?g_st=ic");
  }
}
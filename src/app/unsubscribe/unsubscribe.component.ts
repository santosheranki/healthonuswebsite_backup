import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../services/master.service';
@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrl: './unsubscribe.component.scss'
})
export class UnsubscribeComponent {
  contactForm: FormGroup;
  unsubscribeForm: FormGroup;
  spinner: boolean = false;
  unemailQueryParam: string = '';
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private scroller: ViewportScroller, private masterService: MasterService, private router: Router) {
    this.contactForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      message: ['', Validators.required],
    });
    this.unsubscribeForm = this.fb.group({
      unsubscribeEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.unemailQueryParam = params['email'];
      if (this.unemailQueryParam != null || this.unemailQueryParam != undefined) {
        this.scroller.scrollToAnchor('targetEmail');
      }
    })
  }
  onunsubscribeSubmit() {
    let unsubscribepayload = {
      email: this.unsubscribeForm?.value?.unsubscribeEmail
    }
    if (this.unsubscribeForm.valid) {
      this.spinner = true;
      this.masterService.UnSubscribe(unsubscribepayload).subscribe((response: any) => {
        if (response) {
          this.spinner = false;
          this.router.navigate(['/home']);
        }
      }, (error) => {
        this.spinner = false;
      })
    }
    else {
      this.unsubscribeForm.markAllAsTouched();
    }
  }
  phonePattern(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
}
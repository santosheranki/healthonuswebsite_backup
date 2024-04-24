import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-submit-application',
  templateUrl: './submit-application.component.html',
  styleUrl: './submit-application.component.scss'
})
export class SubmitApplicationComponent implements OnInit {
  formsubmit: any;
  jobId: string | any = '';
  spinner: boolean = false;
  name: any;
  file!: File | any;
  constructor(private fb: UntypedFormBuilder, private masterService: MasterService, private router: ActivatedRoute, private route: Router, private toastr: ToastrService) {
    this.formsubmit = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      uploadfile: ['', [Validators.required]],
      description: ['', []]
    });
  }
  getCtrl(fcName: string, fg: FormGroup) {
    return fg.get(fcName);
  }
  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.jobId = params.get('id');
      }
    });
  }
  async onSubmit() {
    this.spinner = true;
    const formdata = new FormData();
    formdata.append(this.file?.name, this.file);
    let payload = {
      Name: this.formsubmit?.value?.name,
      Email: this.formsubmit?.value?.email,
      PhoneNumber: this.formsubmit?.value?.phonenumber,
      Description: this.formsubmit?.value?.description,
      JobPositionId: this.jobId
    }
    formdata.append("req", JSON.stringify(payload));
    const res = await this.masterService.AddApplicant(formdata);
    if (res === 1) {
      this.formsubmit.reset();
      this.getCtrl("uploadfile", this.formsubmit)?.markAsUntouched();
      this.file = undefined;
      this.toastr.success("Application Submitted Successfully", "Success!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" });

    } else {
      this.toastr.error("Failed to Submit", "Failed!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" });
    }
    this.spinner = false;
  }
  handleUpload() {
    this.getCtrl("uploadfile", this.formsubmit)?.markAsTouched();
    let input = document.getElementById("file");
    input?.click();
  }
  selectFile(e: any) {
    this.file = e?.target?.files[0];
    if (this.file) {
      this.getCtrl("uploadfile", this.formsubmit)?.setValue(this.file?.name);
    }
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
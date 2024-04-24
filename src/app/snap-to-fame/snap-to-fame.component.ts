import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../services/master.service';
import { Meta, Title } from '@angular/platform-browser';
import { MetadataserviceService } from '../services/metadataservice.service';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';

@Component({
  selector: 'app-snap-to-fame',
  templateUrl: './snap-to-fame.component.html',
  styleUrl: './snap-to-fame.component.scss'
})
export class SnapToFameComponent implements OnInit {
  snaptofameform: FormGroup;
  spinner: boolean = false;
  metadata: any;
  environment: Environment | null = null;
  constructor(private fb: UntypedFormBuilder, private router: ActivatedRoute, private masterService: MasterService, private meta: Meta, private title: Title, private metadataservice: MetadataserviceService, private serv: AppInitService) {

    this.snaptofameform = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      middlename: ['', [Validators.minLength(3), Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      mobilenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      departmentname: ['', [Validators.required]],
      studentid: ['', [Validators.required]],
      emailid: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],

    });
    this.environment = serv.config;
  }
  ngOnInit(): void {
    const currentPage = "SnaptoFame";
    this.metadataservice.getMetadata(currentPage).subscribe(metadata => {
      this.metadata = metadata;
    });
    this.title.setTitle(this.metadata?.Title);
    this.meta.addTags([
      {
        name: 'keywords',
        content: this.metadata?.keywords
      },
      {
        name: 'description',
        content: this.metadata?.description
      },
    ]);
  }
  onSubmit() {
    let addsnapfame = {
      FirstName: this.snaptofameform?.value?.firstname,
      MiddleName: this.snaptofameform?.value?.middlename,
      LastName: this.snaptofameform?.value?.lastname,
      PhoneNumber: this.snaptofameform?.value?.mobilenumber,
      Department: this.snaptofameform?.value?.departmentname,
      StudentId: this.snaptofameform?.value?.studentid,
      Email: this.snaptofameform?.value?.emailid,
    }
    if (this.snaptofameform.valid) {
      this.spinner = true;
      this.masterService.AddSnapToFame(addsnapfame).subscribe((response: any) => {
        this.snaptofameform.reset();
        this.spinner = false;
      }, (error) => {
        this.spinner = false;
      })
    } else {
      this.snaptofameform.markAllAsTouched();
    }
  }

}

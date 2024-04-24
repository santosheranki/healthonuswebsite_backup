import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../services/master.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { format, max } from 'date-fns';
import { ViewportScroller } from '@angular/common';
import { AppInitService } from '../services/appinit.service';
import { Environment } from '../models/environment';
import { ModalService } from '../services/modal.service';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit {
  careersForm: FormGroup;
  filenamehere: any;
  onlyfile: any;
  showsuccess: boolean = false;
  spinner: boolean = false;
  joblocation: any;
  jobTitle: any;
  jobdate: any;
  jobId: any;
  fileErrorMessage: any;
  content: any;
  environment: Environment | null = null;
  selectedSegment: any;
  constructor(private fb: FormBuilder, private masterService: MasterService, private modalService: ModalService, private serv: AppInitService, private toastr: ToastrService, private router: ActivatedRoute, private route: Router, private scroller: ViewportScroller) {
    this.careersForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: [''],
      totalexperience: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
      relatedexperience: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
      coverletter: [''],
      termsCheckbox: ['', Validators.required],
      uploadfile: ['', [Validators.required]],
    });
    this.filesChanged = new EventEmitter();
    this.environment = serv.config
    this.selectedSegment = 'Overview';
  }
  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      if (params['id']) {
        this.jobId = params['id'];
      }
    });
    this.CareersGetJobPositionById();
  }
  selectSegment(segment: string) {
    this.selectedSegment = segment;
  }
  CareersGetJobPositionById() {
    this.masterService.GetJobPositionById(this.jobId).subscribe((result: any) => {
      this.content = result;
      this.jobTitle = this.content?.Title;
      const formattedDate = this.content?.OpeningDate;
      this.jobdate = format(new Date(formattedDate), 'dd-MM-yyyy');
      this.joblocation = this.content?.Location;
    });
  }
  gotoApplication() {
    this.scroller.scrollToAnchor('jobapplicationform');
    this.selectedSegment = 'Application';
  }
  @Input() multiple!: boolean;
  @Input() fileType!: string;
  @Input() dragDropEnabled = true;
  @Output() filesChanged!: EventEmitter<FileList>;
  @ViewChild('fileInput') inputRef!: ElementRef<HTMLInputElement>;
  updateFileNamePlaceholder(files: any) {
    const fileNamePlaceholder: any = document.querySelector('.file-name-placeholder');
    if (fileNamePlaceholder && files && files.length > 0) {
      fileNamePlaceholder.textContent = files[0].name;
    }
  }
  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }
  handleFileDrop(event: DragEvent) {
    event.preventDefault();
    const files = (event as any).dataTransfer.files;
    this.addFiles(files);
  }
  addFiles(files: any) {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'pdf'];
    const maxSize = 5 * 1024 * 1024;  // 5MB in bytes
    for (const file of Array.from(files)) {
      if (file instanceof File) {
        if (!allowedTypes.includes(file.type)) {
          this.fileErrorMessage = 'Only PDF and DOC/DOCX files are allowed.';
          return;
        }
        // Check file size
        if (file.size > maxSize) {
          this.fileErrorMessage = 'File size exceeds 5MB limit.';
          return;
        }
        else if (file.size < maxSize) {
          this.fileErrorMessage = '';
          this.fileErrorMessage = false;
        }
        this.onlyfile = file;
        this.filenamehere = file.name;
      }
    }
    this.filesChanged.emit(files);
    this.updateFileNamePlaceholder(files);
  }
  clearFile() {
    this.filenamehere = '';
    this.fileErrorMessage = false;
  }
  closeModal() {
    this.modalService.showModal = false;
    this.showsuccess = false;
    this.route.navigate(['/careers'], { state: { jobs: 'jobs' } });
  }
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey() {
    this.closeModal();
  }
  phonePattern(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  getCtrl(fcName: string, fg: FormGroup) {
    return fg.get(fcName);
  }

  getFileIconClass(): string {
    const fileType = this.getFileExtension(this.filenamehere || '');
    const fileIcons: { [key: string]: string } = {
      'xlsx': 'fa-solid fa-file-excel fa-xl',
      'pdf': 'fa-solid fa-file-pdf fa-xl',
      'default': 'fa-solid fa-file fa-xl',
    };
    ['jpg', 'jpeg', 'png', 'svg'].forEach((type: any) => fileIcons[type] = 'fa-solid fa-file-image fa-xl');
    ['doc', 'docx'].forEach((type: any) => fileIcons[type] = 'fa-solid fa-file-word fa-xl');
    return fileIcons[fileType.toLowerCase()] || fileIcons['default'];
  }
  getFileExtension(filename: any) {
    const parts = filename.split('.');
    return parts[parts.length - 1].toLowerCase();
  }
  async onSubmit() {
    this.spinner = true;
    const formdata = new FormData();
    formdata.append(this.filenamehere, this.onlyfile);
    let payload = {
      Name: this.careersForm?.value?.firstname + " " + this.careersForm?.value?.lastname,
      firstName: this.careersForm?.value?.firstname,
      lastName: this.careersForm?.value?.lastname,
      email: this.careersForm?.value?.email,
      phoneNumber: this.careersForm?.value?.phonenumber,
      address: this.careersForm?.value?.address,
      totalExperience: parseInt(this.careersForm?.value?.totalexperience),
      relatedExperience: parseInt(this.careersForm?.value?.relatedexperience),
      coverLetter: this.careersForm?.value?.coverletter,
      Description: this.careersForm?.value?.description || 'desccccc',
      JobPositionId: this.jobId
    }
    formdata.append("req", JSON.stringify(payload));
    try {
      const response = await this.masterService.AddApplicant(formdata);
      if (response === 1) {
        this.showsuccess = true;
        // this.toastr.success("Application Submitted Successfully", "Success!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" });
      } else {
        this.toastr.error("Please Try Again", "Error!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" });
      }
      this.onlyfile = undefined;
      this.getCtrl("uploadfile", this.careersForm)?.markAsUntouched();
    } catch (error: any) {
      this.spinner = false;
      this.toastr.error("Please Try Again", "Error!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" });
    }
    this.spinner = false;
  }
}
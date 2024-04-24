import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../services/master.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.component.html',
})
export class ApplyForJobComponent implements OnInit {
  jobId: string | any = '';
  content: any;
  constructor(private route: Router, private router: ActivatedRoute, private masterService: MasterService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.jobId = params.get('id');
      }
    });
    this.GetJobPositionById();
  }
  GetJobPositionById() {
    this.masterService.GetJobPositionById(this.jobId).subscribe((res: any) => {
      if (res)
        this.content = res;
    }, (err) => {
      this.toastr.error("Failed to Fetch", "Failed!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" });
    })
  }
  navigatesubmitapplication() {
    this.route.navigate([`/submit-application/${this.jobId}`]);
  }
}
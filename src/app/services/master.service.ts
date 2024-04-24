import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Environment } from '../environments/environment';
import { AppInitService } from './appinit.service';
import { Environment } from '../environments/environment';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient, private initService: AppInitService, private toastr: ToastrService) { }

  AddContact(payload: any) {
    let url = this.initService.config.contactUsURL + `AddContact`;
    return this.http.post(url, payload);
  }

  AddSnapToFame(payload: any) {
    let url = this.initService.config.contactUsURL + `AddSnapToFame`;
    return this.http.post(url, payload);
  }

  AddSubscriber(payload: any) {
    let url = this.initService.config.contactUsURL + `AddSubscriber`;
    return this.http.post(url, payload);
  }
  async AddApplicant(payload: any): Promise<any | 'error'> {
    let url = this.initService.config.contactUsURL + `AddApplicant`;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post<number>(url, payload, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            this.toastr.error("Please Try Again", "Failed!", { timeOut: 5000, closeButton: true, positionClass: "toast-top-right" })
          }
          return throwError(error);
        })
      )
      .toPromise();
  }
  GetAllJobPositions() {
    let url = this.initService.config.contactUsURL + `GetAllJobPositions`;
    return this.http.get<any[]>(url);
  }
  GetJobPositionById(jobId: any) {
    let url = this.initService.config.contactUsURL + `GetJobPositionById?ID=${jobId}`;
    return this.http.get(url);
  }

  fileupload(payload: any) {
    let url = this.initService.config.contactUsURL + `FileUpload`;
    return this.http.post(url, payload);
  }
  UnSubscribe(payload: any) {
    let url = this.initService.config.contactUsURL + `UnSubscribe`;
    return this.http.post(url, payload);
  }
  GetAllMediaArticles() {
    let url = this.initService.config.contactUsURL + `GetAllMediaArticles`;
    return this.http.get(url);
  }
  GetAllMedicalArticlesByDate(payload: any) {
    let url = this.initService.config.contactUsURL + `GetMediaArticlesByDate`;
    return this.http.post(url, payload);
  }
  GetMediaCategoriesTabNames() {
    let url = this.initService.config.contactUsURL + `GetMediaCategories`;
    return this.http.get(url);
  }
  AddEnquiry(payload: any) {
    let url = this.initService.config.enquiryURL + `AddEnquiryForm`;
    return this.http.post(url, payload)
  }
  Getlocal(payload: any) {
    let url = this.initService.config.contactUsURL + `GetMediaArticlesByDate`;
    return this.http.post(url, payload)
  }
  GetFeedbackQuestions() {
    let url = this.initService.config.contactUsURL + `GetAllFeedbackQuestions`;
    return this.http.get(url);
  }
  AddFeedbackQuestionTransaction(payload: any) {
    let url = this.initService.config.contactUsURL + `AddFeedbackQuestionTransaction`;
    return this.http.post(url, payload);
  }
}
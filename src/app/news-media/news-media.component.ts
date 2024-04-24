import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MasterService } from '../services/master.service';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';
@Component({
  selector: 'app-news-media',
  templateUrl: './news-media.component.html',
  styleUrl: './news-media.component.scss'
})
export class NewsMediaComponent implements OnInit {
  selectedTab: string = 'media';
  myForm: any;
  tabNames: any;
  videosForm: any;
  eventsForm: any;
  showVideo: any;
  showArticle: any;
  showEvents: any;
  apiresult: any;
  typeVideos: any;
  spinner: boolean = false;
  articles: any[] = [];
  videoCategoryId: any;
  mediaCategoryId: any;
  eventCategoryId: any;
  environment: Environment | null = null;
  constructor(private fb: FormBuilder, private master: MasterService, private sanitizer: DomSanitizer, private serv: AppInitService) {

    this.environment = serv.config;
  }
  quadrantQuarters: any = {
    1: { fromDate: '2024-01-01', toDate: '2024-03-31' }, // Q1: Jan 1 - Mar 31
    2: { fromDate: '2024-04-01', toDate: '2024-06-30' }, // Q2: Apr 1 - Jun 30
    3: { fromDate: '2024-07-01', toDate: '2024-09-30' }, // Q3: Jul 1 - Sep 30
    4: { fromDate: '2024-10-01', toDate: '2024-12-31' }  // Q4: Oct 1 - Dec 31
  };
  ngOnInit() {
    this.myForm = this.fb.group({
      academicYear: ['1', [Validators.required]],
      quadrant: ['1', [Validators.required]],
    });
    this.videosForm = this.fb.group({
      academicYear: ['1', [Validators.required]],
      quadrant: ['1', [Validators.required]],
    })
    this.eventsForm = this.fb.group({
      academicYear: ['1', [Validators.required]],
      quadrant: ['1', [Validators.required]],
    })
    this.GetMediaCategoriesTabNames();
    this.fetchMediaArticlesOnInit();
    this.selectTab('MediaArticles');
  }
  GetMediaCategoriesTabNames() {
    this.master.GetMediaCategoriesTabNames().subscribe((result: any) => {
      this.tabNames = result;
      const mediaTab = this.tabNames.filter((tab: any) => tab.Name === 'Media Articles' && tab.Name !== 'Videos');
      const videoTab = this.tabNames.filter((tab: any) => tab.Name === 'Videos' && tab.Name !== 'Media Articles');
      const eventsTab = this.tabNames.filter((tab: any) => tab.Name === 'Events' && tab.Name !== 'Media Articles' && tab.Name !== 'Videos');
      console.log("eventsTab", eventsTab);
      if (mediaTab) {
        this.mediaCategoryId = mediaTab[0].ID;
        this.fetchMediaArticles(this.mediaCategoryId);
      }
      if (videoTab) {
        this.videoCategoryId = videoTab[0].ID;
        this.fetchVideos(this.videoCategoryId);
      }
      if (eventsTab) {
        this.eventCategoryId = eventsTab[0].ID
        console.log("this.eventca", this.eventCategoryId);
        this.fetchEvents(this.eventCategoryId);
      }
    })
  }
  selectTab(tabType: string) {
    this.selectedTab = tabType;
    if (tabType === 'MediaArticles') {
      this.showVideo = false;
      this.showEvents = false;
      this.showArticle = true;
      this.fetchMediaArticles(this.mediaCategoryId);
    } else if (tabType === 'Videos') {
      this.showVideo = true;
      this.showArticle = false;
      this.showEvents = false;
      this.fetchVideos(this.videoCategoryId);
    }
    else if (tabType === 'Events') {
      this.showArticle = false;
      this.showVideo = false;
      this.showEvents = true;
      this.fetchEvents(this.eventCategoryId);
    }
  }
  fetchMediaArticlesOnInit() {
    const selectedQuadrant = this.myForm.get('quadrant').value;
    if (selectedQuadrant && this.mediaCategoryId) {
      this.fetchMediaArticles(this.mediaCategoryId);
    }
  }
  fetchMediaArticles(mediaCategoryId: string) {
    const selectedQuadrant = this.myForm.get('quadrant').value;
    const { fromDate, toDate } = this.quadrantQuarters[selectedQuadrant];
    const payload: any = {
      fromDate: fromDate,
      toDate: toDate,
      mediaCategoryId: mediaCategoryId
    };
    this.spinner = true;
    this.master.GetAllMedicalArticlesByDate(payload).subscribe((result: any) => {
      this.spinner = false;
      console.log("ssssssss", result);
      if (result && result.length > 0) {
        const sameOrderNumber = result?.every((article: any, index: any, array: any) => index === 0 || article?.OrderNumber === array[index - 1]?.OrderNumber);
        // if (!sameOrderNumber) {
        //   this.articles = result.sort((a: any, b: any) => a?.OrderNumber - b?.OrderNumber);
        // } else { // }
        this.articles = result;

        this.articles.forEach((article: any) => {
          const dateTime = new Date(article.PublishedDate?.toString());
          const options: any = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
          article.formattedDate = dateTime.toLocaleDateString('en-US', options);
        });
      }
      else {
        this.articles = result;
      }
    });
  }
  fetchVideos(videoCategoryId: string) {
    const selectedQuadrant = this.videosForm.get('quadrant').value;
    const { fromDate, toDate } = this.quadrantQuarters[selectedQuadrant];
    const payload: any = {
      fromDate: fromDate,
      toDate: toDate,
      mediaCategoryId: videoCategoryId
    };
    this.spinner = true;
    this.master.GetAllMedicalArticlesByDate(payload).subscribe((result: any) => {
      if (result && result.length > 0) {
        this.spinner = false;
        this.typeVideos = result.map((content: any) => ({ ...content, safeUrl: this.getSafeUrl(content?.ArticleLink) }));
        this.typeVideos.forEach((video: any) => {
          const dateTime = new Date(video.PublishedDate?.toString());
          const options: any = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
          video.formattedDate = dateTime.toLocaleDateString('en-US', options);
        });
      }
      else {
        this.typeVideos = result;
      }
    });
  }
  fetchEvents(eventCategoryId: any) {
    console.log("eventcategoryidat144fn", eventCategoryId);
    const selectedQuadrant = this.eventsForm.get('quadrant').value;
    const { fromDate, toDate } = this.quadrantQuarters[selectedQuadrant];
    console.log("fromDate,todate", fromDate, toDate);
    let payload = {
      fromDate: fromDate,
      toDate: toDate,
      mediaCategoryId: eventCategoryId
    }
    this.spinner = true;
    this.master.Getlocal(payload).subscribe((result: any) => {
      this.spinner = false;
      this.apiresult = result.reduce((prev: any, cur: any) => {
        let m = prev.find((p: any) => p.SubCategoryID == cur.SubCategoryID);
        if (!m) {
          prev.push({
            "SubCategoryID": cur.SubCategoryID,
            "Name": cur.Name,
            "Events": [cur]
          })
        } else {
          m.Events = [...m.Events, cur]
        }
        return prev;
      }, [])
    })
  }
  getSafeUrl(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  get academicYear() {
    return this.myForm.get('academicYear');
  }
  get quadrant() {
    return this.myForm.get('quadrant');
  }
  gotopage(articleLink: string) {
    if (articleLink !== '') {
      window.open(articleLink)
    }
  }
}
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { BannerSwiperComponent } from './banner-swiper/banner-swiper.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { careathomeComponent } from './careathome/careathome.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NursingCareComponent } from './care-at-center/nursing-care/nursing-care.component';
import { StorelinksComponent } from './storelinks/storelinks.component';
import { CareatcenterComponent } from './careatcenter/careatcenter.component';
import { PhysiotherapyComponent } from './physiotherapy/physiotherapy.component';
import { NursingComponent } from './careathome/nursing/nursing.component';
import { ProductsComponent } from './products/products.component';
import { TransitioncareComponent } from './transitioncare/transitioncare.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WhyusComponent } from './aboutus/whyus/whyus.component';
import { CareersComponent } from './careers/careers.component';
import { InHomephysiotherapyComponent } from './in-homephysiotherapy/in-homephysiotherapy.component';
import { LoaderComponentComponent } from './loader-component/loader-component.component';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { SubmitApplicationComponent } from './apply-for-job/submit-application/submit-application.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SnapToFameComponent } from './snap-to-fame/snap-to-fame.component';
import { SnowFallComponent } from './snow-fall/snow-fall.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CommonDownloadComponent } from './common-download/common-download.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { JobComponent } from './job/job.component';
import { ArticlesComponent } from './articles/articles.component';
import { SubArticlesComponent } from './sub-articles/sub-articles.component';
import { AppInitService } from './services/appinit.service';
import { homeBannerComponent } from './homebanner/homebanner.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AppFeaturesComponent } from './app-features/app-features.component';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { CareAtCenterRehabComponent } from './care-at-center-rehab/care-at-center-rehab.component';
import { CareAtHomeNursingComponent } from './care-at-home-nursing/care-at-home-nursing.component';
import { CareAtCenterTransitionComponent } from './care-at-center-transition/care-at-center-transition.component';
import { CareAtHomePhysioComponent } from './care-at-home-physio/care-at-home-physio.component';
import { CareAtHomePharmaComponent } from './care-at-home-pharma/care-at-home-pharma.component';
import { NewsMediaComponent } from './news-media/news-media.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { ImageComponent } from './image/image.component';
import { FeedbackmodalComponent } from './feedbackmodal/feedbackmodal.component';
import { HomeservicesComponent } from './homeservices/homeservices.component';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { PostservicesComponent } from './postservices/postservices.component';
// import { bannerswipermodule } from './banner-swiper/banner-swiper.module';
export function init_app(appLoadService: AppInitService) {
  return () => appLoadService.init();
}
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    careathomeComponent,
    AboutusComponent,
    PharmacyComponent,
    ContactusComponent,
    NursingCareComponent,
    StorelinksComponent,
    CareatcenterComponent,
    PhysiotherapyComponent,
    NursingComponent,
    TestimonialComponent,
    ProductsComponent,
    TransitioncareComponent,
    WhyusComponent,
    CareersComponent,
    InHomephysiotherapyComponent,
    LoaderComponentComponent,
    ApplyForJobComponent,
    SubmitApplicationComponent,
    ModalPopupComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    SnapToFameComponent,
    SnowFallComponent,
    SitemapComponent,
    FrequentlyAskedQuestionsComponent,
    UnsubscribeComponent,
    PageNotFoundComponent,
    CommonDownloadComponent,
    ScrollTopComponent,
    JobComponent,
    ArticlesComponent,
    SubArticlesComponent,
    homeBannerComponent,
    CareAtCenterRehabComponent,
    AppFeaturesComponent,
    CareAtHomeNursingComponent,
    CareAtCenterTransitionComponent,
    CareAtHomePhysioComponent,
    FeedbackmodalComponent,
    CareAtHomePharmaComponent,
    NewsMediaComponent,
    EnquiryComponent,
    ImageComponent,
    FeedbackmodalComponent,
    HomeservicesComponent,
    PostservicesComponent,
    // BannerSwiperComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    HttpClient,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitService],
      multi: true,
    },
    {
      provide: 'AOS_INSTANCE', // Use a string token
      useValue: AOS.init(),
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

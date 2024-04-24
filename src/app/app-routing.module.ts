import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { careathomeComponent } from './careathome/careathome.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NursingCareComponent } from './care-at-center/nursing-care/nursing-care.component';
import { StorelinksComponent } from './storelinks/storelinks.component';
import { CareatcenterComponent } from './careatcenter/careatcenter.component';
import { PhysiotherapyComponent } from './physiotherapy/physiotherapy.component';
import { ProductsComponent } from './products/products.component';
import { NursingComponent } from './careathome/nursing/nursing.component';
import { TransitioncareComponent } from './transitioncare/transitioncare.component';
import { WhyusComponent } from './aboutus/whyus/whyus.component';
import { CareersComponent } from './careers/careers.component';
import { InHomephysiotherapyComponent } from './in-homephysiotherapy/in-homephysiotherapy.component';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { SubmitApplicationComponent } from './apply-for-job/submit-application/submit-application.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SnapToFameComponent } from './snap-to-fame/snap-to-fame.component';
import { SnowFallComponent } from './snow-fall/snow-fall.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CommonDownloadComponent } from './common-download/common-download.component';
import { JobComponent } from './job/job.component';
import { ArticlesComponent } from './articles/articles.component';
import { SubArticlesComponent } from './sub-articles/sub-articles.component';
import { homeBannerComponent } from './homebanner/homebanner.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AppFeaturesComponent } from './app-features/app-features.component';
import { CareAtCenterRehabComponent } from './care-at-center-rehab/care-at-center-rehab.component';
import { CareAtHomeNursingComponent } from './care-at-home-nursing/care-at-home-nursing.component';
import { CareAtCenterTransitionComponent } from './care-at-center-transition/care-at-center-transition.component';
import { CareAtHomePhysioComponent } from './care-at-home-physio/care-at-home-physio.component';
import { CareAtHomePharmaComponent } from './care-at-home-pharma/care-at-home-pharma.component';
import { NewsMediaComponent } from './news-media/news-media.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { ImageComponent } from './image/image.component';
import { HomeservicesComponent } from './homeservices/homeservices.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'about-us',
    component: AboutusComponent,
  },
  {
    path: 'why-us',
    component: WhyusComponent,
    data: {
      "parent": "aboutus"
    }
  },
  {
    path: 'products-sms-api',
    component: ProductsComponent,
  },
  {
    path: 'care-at-home',
    component: careathomeComponent,
  },
  {
    path: 'home-nursing-care',
    component: NursingComponent,
    data: {
      "parent": "care-at-home"
    }
  },
  {
    path: 'physiotherapy',
    component: InHomephysiotherapyComponent,
    data: {
      "parent": "care-at-home"
    }
  },
  {
    path: 'care-at-center',
    component: CareatcenterComponent,
  },
  {
    path: 'center-nursing-care',
    component: NursingCareComponent,
    data: {
      "parent": "care-at-center"
    }
  },
  {
    path: 'center-pharmacy',
    component: PharmacyComponent,
    data: {
      "parent": "care-at-center"
    }
  },
  {
    path: 'center-physiotherapy',
    component: PhysiotherapyComponent,
    data: {
      "parent": "care-at-center"
    }
  },
  {
    path: 'transition-care',
    component: TransitioncareComponent,
    data: {
      "parent": "care-at-center"
    }
  },
  {
    path: 'careers',
    component: CareersComponent
  },
  {
    path: 'contact-us',
    component: ContactusComponent,
  },
  {
    path: 'Storelinks',
    component: StorelinksComponent,
  },
  {
    path: 'apply-for-job/:id',
    component: ApplyForJobComponent,
  },
  {
    path: 'submit-application/:id',
    component: SubmitApplicationComponent,
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'snap-to-fame',
    component: SnapToFameComponent,
  },
  {
    path: 'snow-fall',
    component: SnowFallComponent,
  },
  {
    path: 'sitemap',
    component: SitemapComponent,
  },
  {
    path: 'frequently-asked-questions',
    component: FrequentlyAskedQuestionsComponent,
  },
  {
    path: 'unsubscribe',
    component: UnsubscribeComponent,
  },
  {
    path: 'common-download',
    component: CommonDownloadComponent,
  },
  {
    path: 'job',
    component: JobComponent,
    data: {
      "parent": "careers"
    }
  },
  {
    path: 'articles',
    component: ArticlesComponent,
  },
  {
    path: 'sub-articles',
    component: SubArticlesComponent,
  },
  {
    path: 'homebanner',
    component: homeBannerComponent,
  },
  {
    path: 'homecare-services',
    component: HomeservicesComponent,
    children: [
      { path: "nursing", component: CareAtHomeNursingComponent },
      { path: "physiotherapy", component: CareAtHomePhysioComponent },
      { path: "pharmacy", component: CareAtHomePharmaComponent },
    ]
  },
  {
    path: 'post-hospitalization-care',
    component: HomeservicesComponent,
    children: [
      { path: "transition-care", component: CareAtCenterTransitionComponent },
      { path: "physio-and-rehab", component: CareAtCenterRehabComponent },
    ]
  },
  {
    path: 'testi',
    component: TestimonialComponent,
  },
  {
    path: 'ModalPopupComponent',
    component: ModalPopupComponent,
  },
  {
    path: 'app-features',
    component: AppFeaturesComponent,
  },
  {
    path: 'news-media',
    component: NewsMediaComponent,
  },
  {
    path: 'enquiry',
    component: EnquiryComponent,
  },
  {
    path: 'image',
    component: ImageComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', useHash: false,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

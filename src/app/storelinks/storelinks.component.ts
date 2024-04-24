import { Component } from '@angular/core';

@Component({
  selector: 'app-storelinks',
  templateUrl: './storelinks.component.html',
  styleUrl: './storelinks.component.scss'
})
export class StorelinksComponent {
  constructor() {
    const iPod = navigator.userAgent.includes("iPod");
    const iPhone = navigator.userAgent.includes("iPhone");
    const iPad = navigator.userAgent.includes("iPad");
    const Android = navigator.userAgent.includes("Android");
    if (iPod || iPhone || iPad) {
      window.location.href = "https://apps.apple.com/us/app/healthonus/id6468228557"; // <-apple store link here
    } else if (Android) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.healthonus.io"; // <-android store link here
    }
  }
}

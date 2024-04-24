import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-articles',
  templateUrl: './sub-articles.component.html',
  styleUrl: './sub-articles.component.scss'
})
export class SubArticlesComponent implements OnInit {
  ngOnInit() {
  }
  constructor(private route: Router, private scroller: ViewportScroller) {

  }
  redirectArticle() {
    // this.route.navigate(['/sub-articles']); //use it when api call is there
    // this.scroller.scrollToAnchor('navigateupwards'); 
    //use it when the page is static
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

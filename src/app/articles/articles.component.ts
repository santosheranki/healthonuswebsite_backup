import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  ngOnInit() {
  }

  constructor(private router: Router) { }
  currentPage = 1;
  itemsPerPage = 9;
  articles: any[] = [
    {
      title: 'Physiotherapy',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/backpainphysio.png',
    },
    {
      title: 'Nursing',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/nursebpcheckingpatient.png',

    },
    {
      title: 'Pharmacy',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/handfulloftablets.png',
    },
    {
      title: 'Physiotherapy',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/backpainphysio.png',
    },
    {
      title: 'Nursing',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/nursebpcheckingpatient.png',

    },
    {
      title: 'Pharmacy',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/handfulloftablets.png',
    },
    {
      title: 'Physiotherapy',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/backpainphysio.png',
    },
    {
      title: 'Nursing',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/nursebpcheckingpatient.png',

    },
    {
      title: 'Pharmacy',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/handfulloftablets.png',
    },

    //new pagination starts here
    {
      title: 'Physiotherapy2',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/backpainphysio.png',
    },
    {
      title: 'Nursing2',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/nursebpcheckingpatient.png',

    },
    {
      title: 'Pharmacy2',
      date: 'February 11, 2024',
      content: 'Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum Lorum Ipsum Lorum ipsum....',
      author: 'Joanna Wellick',
      imageSrc: '../../assets/articles/handfulloftablets.png',
    }
  ];

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }
  getPaginatedResults(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.articles.length);
    return this.articles.slice(startIndex, endIndex);
  }
  gotocard() {
    this.router.navigate(['/sub-articles']);
  }
}

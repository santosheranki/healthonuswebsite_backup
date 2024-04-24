import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader-component.component.html',
  styleUrl: './loader-component.component.scss'
})
export class LoaderComponentComponent {
  showloader: boolean = false

  ngOnInit() {
    this.showloader = true;
    setTimeout(() => {
      this.showloader = false;
    }, 1000);
  }

}

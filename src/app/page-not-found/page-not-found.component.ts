import { Component, OnInit } from '@angular/core';
import { AppInitService } from '../services/appinit.service';
import { Environment } from '../models/environment';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit {
  environment: Environment | null = null;
  constructor(private serv: AppInitService) {
    this.environment = serv.config;
  }
  ngOnInit() {
  }

}

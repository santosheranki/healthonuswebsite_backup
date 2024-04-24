import { Component, OnInit } from '@angular/core';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';
@Component({
  selector: 'app-common-download',
  templateUrl: './common-download.component.html',
  styleUrl: './common-download.component.scss'
})
export class CommonDownloadComponent implements OnInit {
  environment: Environment | null = null;
  constructor(private serv: AppInitService) {
    this.environment = serv.config;
  }
  ngOnInit() {
  }
  playStore() {
    window.open("https://link.healthonus.io/gMfKGj")
  }
}
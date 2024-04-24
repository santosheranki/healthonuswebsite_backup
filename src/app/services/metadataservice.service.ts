import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as METADATA from '../../assets/metadata.json';
@Injectable({
  providedIn: 'root'
})
export class MetadataserviceService {

  constructor() { }
  private metadata = { METADATA }
  getMetadata(page: string): Observable<any> {
    console.log(`Check your metadata here!`, this.metadata);
    const metadata = this.metadata?.METADATA?.metatags?.find((entry: any) => entry?.page === page);
    return of(metadata);
  }
}

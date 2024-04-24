import { Injectable, Injector } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Environment } from '../models/environment';

declare var window: any;

@Injectable({ providedIn: 'root' })
export class AppInitService {

    private _config: any;
    constructor(private injector: Injector) { }
    // This is the method you want to call at bootstrap
    // Important: It should return a Promise
    public init(): Observable<Environment> {
        return from(
            fetch('assets/app-config.json').then(function (response) {
                return response.json();
            })
        ).pipe(
            map((config) => {
                this._config = config;
                return config;
            }));
    }

    get config() {
        return this._config;
    }
}
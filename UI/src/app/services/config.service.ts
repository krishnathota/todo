// config.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Config } from '../models/config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  get config(): Config {
    return this._config;
  }

  private set config(value: Config) {
    this._config = value;
  }

  private _config!: Config;

  constructor(private readonly http: HttpClient) {}

  loadConfig(): Observable<Config> {
    return this.http.get('/assets/config.json').pipe(
      tap((config: any) => {
        console.log('Configuration loaded:', config);
        this.config = config;
      }),
      catchError((error: any) => {
        console.error('Error loading configuration:', error);
        throw error;
      }),
    );
  }
}

import {Injectable, OnDestroy} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

export interface ApiServiceParam {
  [param: string]: string | string[] | number | number[] | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnDestroy {

  private apiBaseUrl: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {}
}

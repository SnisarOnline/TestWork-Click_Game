import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpParameterCodec, HttpParams} from '@angular/common/http';
import {Observable} from '@app-rxjs';
import {StatusCodes} from 'http-status-codes/build/es';

export interface ApiServiceParam {
  [param: string]: string | string[] | number | number[] | boolean;
}

class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

@Injectable({providedIn: 'root'})
export class ApiService {

  private apiBaseUrl: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) {}

  private getQueryParams(params: ApiServiceParam = {}): HttpParams {
    Reflect.ownKeys(params).forEach(key => {
      if (
        Reflect.get(params, key) === undefined ||
        Reflect.get(params, key) === null ||
        Reflect.get(params, key) === ''
      ) {
        Reflect.deleteProperty(params, key);
      }
    });
    let httpParams = new HttpParams({encoder: new CustomHttpParamEncoder()});
    Reflect.ownKeys(params).forEach((key: string | number | symbol) => {
      httpParams = httpParams.append(key as string, params[key as string] + '');
    });

    return httpParams;
  }


  public getObservable<T>(
    relativeUrl: string,
    params?: ApiServiceParam,
    getCount?: boolean,
    reportProgress = false,
  ): Observable<T> {
    return this.http
      .get<T>(`${this.apiBaseUrl}/${relativeUrl}`, {
        params: this.getQueryParams(params),
        reportProgress,
      });
  }

  public postObservable<T>(
    relativeUrl: string,
    body: any | null,
    params?: ApiServiceParam,
    reportProgress = false,
  ): Observable<T> {
    return this.http
      .post<T>(`${this.apiBaseUrl}/${relativeUrl}`, body, {
        params: this.getQueryParams(params),
        reportProgress,
      });
  }

  public putObservable<T>(
    relativeUrl: string,
    body: any | null,
    params?: ApiServiceParam,
    reportProgress = false,
  ): Observable<T> {
    return this.http
      .put<T>(`${this.apiBaseUrl}/${relativeUrl}`, body, {
        params: this.getQueryParams(params),
        reportProgress,
      });
  }

  public patchObservable<T>(
    relativeUrl: string,
    body: any | null,
    params?: ApiServiceParam,
    reportProgress = false,
  ): Observable<T> {
    return this.http
      .patch<T>(`${this.apiBaseUrl}/${relativeUrl}`, body, {
        params: this.getQueryParams(params),
        reportProgress,
      });
  }

  public deleteObservable<T>(
    relativeUrl: string,
    params?: ApiServiceParam,
    reportProgress = false,
  ): Observable<T> {
    return this.http
      .delete<T>(`${this.apiBaseUrl}/${relativeUrl}`, {
        params: this.getQueryParams(params),
        reportProgress,
      });
  }


}

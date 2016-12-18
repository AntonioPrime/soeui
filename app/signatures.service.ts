import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SignaturesService {
  private url: string = 'http://localhost:8080/ajax/signatures';
  private headers = new Headers({ 'Content-Type' : 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {}

  replace(fresh: string, locationId: number): Promise<any> {
    return this.http.post(this.url, JSON.stringify(
      {
        fresh: fresh,
        locationId: locationId
      }), this.options)
      .toPromise();
  }
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SignaturesService {
  private url: string = 'http://' + window.location.hostname + ':8080' + '/ajax/signatures';

  constructor(private http: Http) { }

  replace(fresh: string, locationId: number): Promise<any> {
    var token = localStorage.getItem('token');
    var headers = new Headers({
      'Content-Type': 'application/json',
      'token': token
    });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, JSON.stringify(
      {
        fresh: fresh,
        locationId: locationId
      }), options)
      .toPromise();
  }
}

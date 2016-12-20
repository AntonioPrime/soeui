import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from './user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    constructor(
        private http: Http
    ) { }

    public getTokens(code: string): Promise<any> {
        // let headers = new Headers({
        //     'Authorization': 'Basic ZTFjYzEyY2I3NTBmNDFkNmJkMDMwM2RhZjg4MWI1YjM6WWhlaUJVYWxHcTJROWlVSmRWQW94Z1V4dU1na0lhWHA3cmpoTUEyVg==',
        //     'Content-Type': 'application/json',
        //     'Host': 'login.eveonline.com'
        // });
        // let options = new RequestOptions({ method: 'POST' , headers: headers
        //     });
        // return this.http.post('https://login.eveonline.com/oauth/token',
        //     JSON.stringify({
        //         'grant_type': 'authorization_code',
        //         'code': code
        //     }), options).toPromise();
        return this.http.get('http://' + window.location.hostname + ':8080/ajax/oauth2/tokens?code=' + code).toPromise();
    }

    public getLocation(userId: string): Promise<any> {
        let headers = new Headers({
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('https://crest-tq.eveonline.com/characters/' + userId + '/location/', options).toPromise();
    }

    public getUser(token: string): Promise<Response> {
        let headers = new Headers({
            'token': token
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://' + window.location.hostname + ':8080/ajax/oauth2/test', options).toPromise();
    }

    public getTokenByRefreshToken(refresh_token: string): Promise<Response> {
        return this.http.get('http://' + window.location.hostname + ':8080/ajax/oauth2/token?refresh_token=' + refresh_token).toPromise();
    }
}

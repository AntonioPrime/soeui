import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user';

@Component({
    moduleId: module.id,
    selector: 'user-panel',
    templateUrl: 'user-panel.component.html'
})
export class UserPanelComponent implements OnInit {
    private user: User;
    private locationName: string;
    private loginUrl: string = 'http://' + window.location.hostname + ':8080' + '/oauth2/login';
    constructor(private service: AuthService) { }

    ngOnInit() {
        let _this = this;
        setInterval(function () {
            console.log('expired :' + _this.isExpired());
            if (_this.hasTimeStamp()) {
                if (_this.isExpired()) {
                    console.log('get new token');
                    _this.service.getTokenByRefreshToken(localStorage.getItem('refresh_token'))
                        .then(r => {
                            localStorage.setItem('token', r.json().access_token);
                            localStorage.setItem('time_stamp', _this.timeStamp());
                        });
                } else {
                    if (!_this.user) {
                        _this.getUser(localStorage.getItem('token'));
                    }
                    if (_this.user) {
                        _this.service.getLocation(_this.user.userId)
                        .then(loc => {
                            let locationName = loc.json().solarSystem.name;
                            if (locationName) {
                                _this.locationName = locationName;
                            }
                        });
                    }
                }
            }
        }, 5000);
    }

    public getUser(token: string): void {
        let test: Promise<any> =
            this.service.getUser(token);
        test.then(r => {
            this.user = r.json();
        }).catch(error => console.log('error ' + error));
    }

    private hasRefreshToken(): boolean { return localStorage.getItem('refresh_token') != null ? true : false; };

    private hasTimeStamp(): boolean { return localStorage.getItem('time_stamp') != null ? true : false; };

    private isExpired(): boolean {
        let time_stamp = Number.parseInt(localStorage.getItem('time_stamp'));
        let estimated = Date.now() - time_stamp;
        console.log(estimated);
        return estimated >= 0 ? true : false;
    }

    private timeStamp(): string {
        return (Date.now() + (1170 * 1000)).toString();
    }
}

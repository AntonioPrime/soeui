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
    private loginUrl: string = `http://${window.location.hostname}:8080/oauth2/login`;
    constructor(private service: AuthService) { }

    ngOnInit() {
        let _this = this;
        let interval = 7000;
        (function authFlow() {
            if (_this.hasTimeStamp()) {
                if (_this.isTimeStampExpired()) {
                    _this.initNewTokenAndUpdateLocation();
                } else {
                    if (!_this.user) {
                        _this.initUserAndLocation();
                    }
                    if (_this.user) {
                        _this.updateLocation();
                    }
                }
            }
            setTimeout(authFlow, interval);
        })();
    }

    public initUserAndLocation(): void {
        let token = localStorage.getItem('token');
        let test: Promise<any> =
            this.service.getUser(token);
        test.then(r => {
            this.user = r.json();
            this.updateLocation();
        }).catch(error => console.log('error ' + error));
    }

    private hasRefreshToken(): boolean { return localStorage.getItem('refresh_token') != null ? true : false; };

    private hasTimeStamp(): boolean { return localStorage.getItem('time_stamp') != null ? true : false; };

    private isTimeStampExpired(): boolean {
        let time_stamp = Number.parseInt(localStorage.getItem('time_stamp'));
        let estimated = Date.now() - time_stamp;
        return estimated >= 0 ? true : false;
    }

    private timeStamp(): string { return (Date.now() + (1170 * 1000)).toString(); }

    private logOut(): void {
        localStorage.clear();
        this.user = null;
        this.locationName = null;
    }

    private initNewTokenAndUpdateLocation(): void {
        this.service.getTokenByRefreshToken(localStorage.getItem('refresh_token'))
            .then(r => {
                localStorage.setItem('token', r.json().access_token);
                localStorage.setItem('time_stamp', this.timeStamp());
                this.updateLocation();
            });
    }

    private updateLocation(): void {
        this.service.getLocation(this.user.userId)
            .then(loc => {
                let locationName = loc.json().solarSystem.name;
                if (locationName) {
                    this.locationName = locationName;
                }
            });
    }
}

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
            //_this.locationName = _this.getLocation();
            if (!_this.user) {
                _this.getUser(localStorage.getItem('token'));
            }
            //console.log(_this.user.userName);
        }, 5000);
    }

    public getUser(token: string): void {
        let test: Promise<any> =
            this.service.getUser(token);
        test.then(r => {
            console.log(r.json() as User);
            this.user = r.json();
        });
    }

    //  private getLocation(): string {
    //     this.service.getLocation();
    //  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'auth',
    template: ''
})
export class AuthComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: AuthService) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                let code = param['code'];
                if (code) {
                    console.log('auth in: ' + code);
                    this.service.getTokens(code).then(r => {
                        localStorage.setItem('token', r.json().access_token);
                        localStorage.setItem('refresh_token', r.json().refresh_token);
                    });
                }
                //this.router.navigate(['/signatures']);
            });
    }
    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }
}

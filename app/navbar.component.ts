import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: 'navbar.component.html'
})
export class NavBarComponent implements OnInit {
    private loginUrl: string = 'http://' + window.location.hostname + ':8080' + '/oauth2/login';
    constructor() { }

    ngOnInit() { }

}

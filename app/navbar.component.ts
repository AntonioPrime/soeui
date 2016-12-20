import { Component, OnInit } from '@angular/core';
import { UserPanelComponent } from './user-panel.component';

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: 'navbar.component.html'
})
export class NavBarComponent implements OnInit {
    private user: string;
    constructor() { }

    ngOnInit() {
        this.user = sessionStorage.getItem('user');
        console.log('navbar init');
     }

}

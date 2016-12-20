import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignaturesComponent} from './signatures.component';
import {AuthComponent} from './auth.component';


const routes: Routes = [
    // { path: '', redirectTo: '/signatures', pathMatch: 'full' },
    { path: 'signatures', component: SignaturesComponent },
    { path: 'auth', component: AuthComponent},
    { path: 'oauth2/code', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

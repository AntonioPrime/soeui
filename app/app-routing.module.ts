import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignaturesComponent} from "./signatures.component";


const routes: Routes = [
    { path: '', redirectTo: '/signatures', pathMatch: 'full' },
    { path: 'signatures', component: SignaturesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

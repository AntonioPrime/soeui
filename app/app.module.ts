import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';
import {SignaturesComponent} from "./signatures.component";
import {NavBarComponent} from "./navbar.component";
import {SignaturesService} from "./signatures.service";
import {HttpModule} from "@angular/http";

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, HttpModule],
  declarations: [ AppComponent, SignaturesComponent, NavBarComponent],
  providers: [ SignaturesService ],
  bootstrap:    [ AppComponent ],
})
export class AppModule {

}

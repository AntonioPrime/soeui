import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignaturesComponent } from './signatures.component';
import { NavBarComponent } from './navbar.component';
import { SignaturesService } from './signatures.service';
import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';
import { UserPanelComponent } from './user-panel.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpModule],
  declarations: [
    AppComponent,
    SignaturesComponent,
    NavBarComponent,
    AuthComponent,
    UserPanelComponent
    ],
  providers: [SignaturesService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {

}

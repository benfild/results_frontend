import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';


import { CoreModule } from './core.module';
import { AppRoutingModule } from './app-routing.module';
import { AccountsModule } from "./accounts/accounts.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ToastrModule.forRoot(),
    AccountsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

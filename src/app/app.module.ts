import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIComponent } from './api/api.component';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './localstorage.service';

@NgModule({
  declarations: [
    AppComponent,
    APIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

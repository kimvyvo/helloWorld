import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TextComponent } from './text/text.component';
import { DrawComponent } from './draw/draw.component';
import { ErrorComponent } from './error/error.component';

import { HttpService } from './http.service';
import { ShareService } from './share.service';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    TextComponent,
    DrawComponent,
    ErrorComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    YoutubePlayerModule,
  ],
  providers: [HttpService, ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }

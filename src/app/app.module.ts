import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router} from './app.routing';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { BoardComponent } from './board/board.component';
import {MatCardModule} from '@angular/material/card';
import { PinComponent } from './pin/pin.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HostnameToMarketplacePipe } from './hostname-to-marketplace.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    PinComponent,
    LoadingSpinnerComponent,
    HostnameToMarketplacePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Router,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

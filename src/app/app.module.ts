import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router} from './app.routing';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { AddPinDialogComponent, BoardComponent} from './board/board.component';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PinComponent } from './pin/pin.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HostnameToMarketplacePipe } from './pipes/hostname-to-marketplace.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {GlobalErrorHandler} from './globalErrorHandler';
import {HttpErrorInterceptor} from './http-error.interceptor';
import { BoardInfoComponent } from './board-info/board-info.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';


/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { PinTagsComponent } from './pin-tags/pin-tags.component';
import { MatTooltipModule} from '@angular/material/tooltip';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    PinComponent,
    LoadingSpinnerComponent,
    HostnameToMarketplacePipe,
    BoardInfoComponent,
    AddPinDialogComponent,
    SearchFilterPipe,
    PinTagsComponent
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
    MatCardModule,
    MatSnackBarModule,
    NgZorroAntdModule,
    DragDropModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    { provide: NZ_I18N, useValue: en_US }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

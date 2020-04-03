import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from './services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {

  }

  handleError(error: any): void {
    const notificationService = this.injector.get(NotificationService);

    console.error(error);
    const message = error.message;
    notificationService.showError('soz there was an error :( big sad');

  }
}

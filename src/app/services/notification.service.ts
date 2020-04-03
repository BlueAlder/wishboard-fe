import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  errorConfig: MatSnackBarConfig = {
    panelClass: ['error'],
    duration: 5000,
    verticalPosition: 'top'
  };

  constructor(public snackBar: MatSnackBar) { }

  showMessage(hi: string) {
    return;
  }

  showError(message: string ): void {
    this.snackBar.open(message, 'CLOSE', this.errorConfig);
  }


}

import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  barHorizontalPosition: MatSnackBarHorizontalPosition = 'left';

  barVerticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string, title: string): void {
    this.snackBar.open(message, title, {
      duration: 3000,
      horizontalPosition: this.barHorizontalPosition,
      verticalPosition: this.barVerticalPosition,
      panelClass: 'success',
    });
  }

  showError(message: string, title: string): void {
    this.snackBar.open(message, title, {
      duration: 100000,
      horizontalPosition: this.barHorizontalPosition,
      verticalPosition: this.barVerticalPosition,
      panelClass: 'error',
    });
  }
}

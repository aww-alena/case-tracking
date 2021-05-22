import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../modules/auth/components/popup/popup.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  opened = false;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    this.opened = true;
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '450px',
      panelClass: 'custom-modalbox',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  constructor(public dialogRef: MatDialogRef<PopupComponent>) {}

  ngOnInit(): void {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  goToLoginTab(): void {
    this.tabGroup.selectedIndex = 0;
  }
}

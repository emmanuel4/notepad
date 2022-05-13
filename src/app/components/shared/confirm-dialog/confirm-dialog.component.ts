import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

  deleteNote(id: string) {
    const promise = this.apiService.deleteNote(id);
    promise.then(() => {
      this.openSnackBar('Note deleted.')
    }).catch((error) => {
      console.error(error['code']);
      this.openSnackBar('An error ocurred, try again later.')
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {duration: 2000})
  }
}

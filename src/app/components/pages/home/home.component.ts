import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Note } from '../../../models/note.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public notes$: Observable<Note[]> | undefined;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.notes$ = this.apiService.getNotes()
  }

  archiveNote(id: string) {
    const promise = this.apiService.archiveNote(id);
    promise.then(() => {
      this.openSnackBar('Note archived.')
    }).catch((error) => {
      console.error(error['code'])
      this.openSnackBar('An error ocurred, try again later.')
    })
  }

  openDialog(id: string) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '20rem',
      data: id,
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {duration: 2000})
  }

}

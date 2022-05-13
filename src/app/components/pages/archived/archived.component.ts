import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.scss']
})
export class ArchivedComponent implements OnInit {

  public notes$: Observable<Note[]> | undefined;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.notes$ = this.apiService.getArchivedNotes()
  }

  unarchiveNote(id: string) {
    const promise = this.apiService.unarchiveNote(id);
    promise.then(() => {
      this.openSnackBar('Note unarchived.')
    }).catch((error) => {
      console.error(error['code'])
      this.openSnackBar('An error ocurred, try again later.')
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {duration: 2000})
  }

}

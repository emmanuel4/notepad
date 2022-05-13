import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';
import { ApiService } from '../../../services/api.service';
import { Note } from 'src/app/models/note.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9]$/)]],
      description: ['', [Validators.required, Validators.minLength(25), Validators.maxLength(150)]]
    });
  }

  checkMaxLength(txtArea: HTMLTextAreaElement) {
    txtArea.value = (txtArea.value.length > 150) ? txtArea.value.slice(0, 150) : txtArea.value
  }

  save(event: Event) {
    event.preventDefault();
    let data:Note = {
      id: Math.floor(Math.random())+this.form.value.title.replace(/\s/g, ''),
      title: this.form.value.title,
      description: this.form.value.description,
      date: Timestamp.fromDate(new Date()),
      archived: false
    }
    const promise = this.apiService.postNote(data);
    promise.then(() => {
      this.openSnackBar('Note created.')
      this.form.reset()
    }).catch((error) => {
      console.error(error['code']);
      this.openSnackBar('An error ocurred, try again later.')
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {duration: 2000})
  }

}

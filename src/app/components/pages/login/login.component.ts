import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    });
  }

  login(event: Event) {
    event.preventDefault();
    const promise = this.apiService.signIn(this.form.value);
    promise.then(() => {
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.error(error['code'])
      const message = ((error['code'] == 'auth/wrong-password' || error['code'] == 'auth/user-not-found') ? 'Wrong user or password, try again.' : 'An error ocurred, try again later.')
      this.openSnackBar(message)
    })
  }

  loginGoogle() {
    const promise = this.apiService.signInWithGoogle();
    promise.then((response) => {
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.error(error);
      this.openSnackBar('An error ocurred, try again later.')
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {duration: 2000})
  }

}

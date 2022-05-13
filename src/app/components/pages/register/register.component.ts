import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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

  save(event: Event) {
    event.preventDefault();
    const promise = this.apiService.register(this.form.value);
    promise.then(() => {
      this.openSnackBar('User register', 'Ok')
    }).catch((error) => {
      console.error(error['code']);

      this.openSnackBar((error['code'] == 'auth/email-already-in-use') ? 'User already exist' : 'An error ocurred, try again later.', undefined);
    })

    // response == 'An error ocurred, try again later.' ? console.error('error') : this.router.navigate(['/login']);
  }

  openSnackBar(message: string, action: string | undefined) {
    const snackBarRef = this.snackBar.open(message, undefined, {duration: 2000});
    if (action != undefined) {
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/login']);
      })
    }
  }

}

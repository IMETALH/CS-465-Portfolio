import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public formErrorMsg: string = ''; // Initially no error message
  public formInvalid: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onLoginSubmit(): void {
    this.formInvalid = this.loginForm.invalid;

    if (this.loginForm.invalid) {
      // Show a specific error message for invalid form
      this.formErrorMsg = 'All fields are required, please try again.';
      return;
    }

    this.doLogin(); // Proceed with the login if the form is valid
  }

  private doLogin(): void {
    this.authenticationService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('list-trips');
      },
      error: (message) => {
        // Update the error message if login fails
        this.formErrorMsg = message;
        this.formInvalid = true;
      },
    });
  }
}

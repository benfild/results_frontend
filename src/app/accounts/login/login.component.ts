import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notifications.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loadingState = false;

  passwordVisible = false;

  loginForm!: FormGroup;
  isSubmitted = false;

  subscriptions: Subscription[] = []


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private notify: NotificationService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.loginForm?.controls;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.loadingState = true;

    if (this.loginForm?.invalid) {
      return;
    }

    this.subscriptions.push(this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (response) => {
        this.loadingState = false;
        this.isSubmitted = false;
        this.notify.showSuccess(response.message, 'Login');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        this.loadingState = false;
        console.log(error);
        this.notify.showError(error, 'Error');
      }
    }));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}

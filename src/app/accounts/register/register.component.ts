import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../helpers/must-match.validator";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  loadingState = false;

  passwordVisible = false;
  passwordConfirmVisible = false;

  registerForm!: FormGroup;
  isSubmitted = false;

  subscriptions: Subscription[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private notify: NotificationService,) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'fullName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'passwordConfirm': new FormControl(null, [Validators.required])
    }, {
      validator: MustMatch('password', 'passwordConfirm')
    });
  }

  get f() {
    return this.registerForm?.controls;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  togglePasswordConfirmVisibility() {
    this.passwordConfirmVisible = !this.passwordConfirmVisible
  }

  onSubmit() {
    this.isSubmitted = true;
    this.loadingState = true;

    if (this.registerForm?.invalid) {
      return;
    }

    this.subscriptions.push(this.auth.register(this.registerForm.value.fullName, this.registerForm.value.email, this.registerForm.value.password).subscribe({
      next: (response) => {
        this.loadingState = false;
        this.isSubmitted = false;
        this.notify.showSuccess(response.message, 'Register');
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

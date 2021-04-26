import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'src/app/services/message-service/message.service';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() goToApp: EventEmitter<string> = new EventEmitter();

  form: FormGroup;

  user: User;

  subscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.route.queryParams.subscribe((params: Params) => {
      if (params.registered) {
        // Register
      } else if (params.accessDenied) {
        // you must register
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void {
    this.createUser();
    this.subscription = this.auth.login(this.user).subscribe(
      () => {
        this.router.navigate(['/app/dashboard']);
        this.goToApp.emit('close');
        this.messageService.showMessage('Access is allowed ', 'Yupikai!');
      },
      (error) => {
        this.form.enable();
        this.messageService.showError(error.error.message, 'Uuups! Error.');
      },
    );
  }

  private createForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  private createUser() {
    this.form.disable();
    return (this.user = this.form.value);
  }

  get email(): FormGroup {
    return this.form.get('email') as FormGroup;
  }

  get password(): FormGroup {
    return this.form.get('password') as FormGroup;
  }
}

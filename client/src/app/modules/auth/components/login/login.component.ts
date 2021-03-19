import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../../../interfaces/user';
import { MessageService } from 'src/app/services/message-service/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  user: User;
  subscription: Subscription;

  @Output() goToApp: EventEmitter<string> = new EventEmitter();
  
  constructor(public translate: TranslateService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.createForm();

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Register
      } else if (params['accessDenied']) {
        // you must register
      }

    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private createForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  

  private createUser() {
    this.form.disable();
    return this.user = this.form.value;
  }

  onSubmit() {
    this.createUser();
    this.subscription = this.auth.login(this.user).subscribe(
      () => {
        this.router.navigate(['/app']);
        this.goToApp.emit('close');
        this.messageService.showMessage('Access is allowed ' , 'Yupikai!');

      },
      error => {
        this.form.enable();
        this.messageService.showError(error.error.message , 'Uuups! Error.');
      }
    )
  }

  get email(): FormGroup{
    return this.form.get('email') as FormGroup;
  }

  get password(): FormGroup{
    return this.form.get('password') as FormGroup;
  }

}

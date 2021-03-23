
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../../../interfaces/user';
import { MessageService } from 'src/app/services/message-service/message.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy  {

    @Output() loginTab: EventEmitter<string> = new EventEmitter();

    form: FormGroup;
    user: User;
    subscription: Subscription;

    constructor(private auth: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private messageService: MessageService) { }

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
        this.subscription = this.auth.register(this.user).subscribe(
            () => {

                this.loginTab.emit('go');
                this.messageService.showMessage('Now you can sign in!' , 'Awesome!');

            },
            error => {
                this.form.enable();
                this.messageService.showError(error.error.message , 'Uuups! Error.');


            }
        );
    }

    private createForm() {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required])
        });
    }

    private createUser() {
        this.form.disable();
        this.user = this.form.value;
    }

    get name(): FormGroup{
        return this.form.get('name') as FormGroup;
    }

    get email(): FormGroup{
        return this.form.get('email') as FormGroup;
    }

    get password(): FormGroup{
        return this.form.get('password') as FormGroup;
    }
}

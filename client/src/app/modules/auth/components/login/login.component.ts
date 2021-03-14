import { AfterContentInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({});
  errors: any;

  constructor(public translate: TranslateService,
              private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.createForm();
  }

  authUser(): void {}

  private createForm(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cabinet-layout',
  templateUrl: './cabinet-layout.component.html',
  styleUrls: ['./cabinet-layout.component.css']
})
export class CabinetLayoutComponent implements OnInit {

  links = [
    {url: '/affairs', name: 'Affairs'},
    {url: '/affairs/create', name: 'Create affair'}
  ]

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['']);
  }

}

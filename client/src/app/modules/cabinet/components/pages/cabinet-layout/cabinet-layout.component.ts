import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cabinet-layout',
  templateUrl: './cabinet-layout.component.html',
  styleUrls: ['./cabinet-layout.component.css'],
})
export class CabinetLayoutComponent implements OnInit {
  links = [
    { url: '/habits', name: 'Habits' },
    { url: '/habits/create', name: 'Create habit' },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['']);
  }
}

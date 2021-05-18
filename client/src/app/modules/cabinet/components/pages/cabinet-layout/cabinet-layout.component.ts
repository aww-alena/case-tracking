import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TitleStoreService } from 'src/app/services/title/title-store.service';
@Component({
  selector: 'app-cabinet-layout',
  templateUrl: './cabinet-layout.component.html',
  styleUrls: ['./cabinet-layout.component.css'],
})
export class CabinetLayoutComponent implements OnInit {
  links = [
    { name: 'dashboard', url: '/app/dashboard', icon: 'space_dashboard' },
    { name: 'habits', url: '/app/habits', icon: 'business_center' },
    { name: 'tasks', url: '/app/tasks', icon: 'adjust' },
    { name: 'categories', url: '/statistics/categories', icon: 'category' },
    { name: 'statistics', url: '/statistics/habits', icon: 'auto_graph' }
  ];

  mobileOpen = false;
  title = '';

  constructor(private auth: AuthService, private router: Router, private titleService: TitleStoreService) {}

  ngOnInit(): void {
    this.titleService.title.subscribe(title => {
      this.title = title;
    });
  }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['']);
  }
}

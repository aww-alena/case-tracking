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
    { url: 'dashboard', icon: 'space_dashboard' },
    { url: 'habits', icon: 'business_center' },
    { url: 'tasks', icon: 'adjust' },
    { url: 'categories', icon: 'category' },
    { url: 'statistics', icon: 'auto_graph' },
    { url: 'statistics/time', icon: 'auto_graph' }
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

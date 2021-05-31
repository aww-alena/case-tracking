import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TitleStoreService } from 'src/app/services/title/title-store.service';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-cabinet-layout',
  templateUrl: './cabinet-layout.component.html',
  styleUrls: ['./cabinet-layout.component.css'],
})
export class CabinetLayoutComponent implements OnInit, OnDestroy {
  links = [
    { name: 'dashboard', url: '/app/dashboard', icon: 'space_dashboard' },
    { name: 'habits', url: '/app/habits', icon: 'business_center' },
    { name: 'tasks', url: '/app/tasks', icon: 'adjust' },
    { name: 'categories', url: '/statistics/categories', icon: 'category' },
    { name: 'statistics', url: '/statistics/habits', icon: 'auto_graph' }
  ];

  mobileOpen = false;
  title = '';
  dateTitle = '';

  subscriptions: Subscription = new Subscription();

  constructor(private auth: AuthService,
              private router: Router,
              private titleService: TitleStoreService,
              private translate: TranslateService) {}

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit(): void {
    //console.log(this.translate.getBrowserLang());

    this.subscriptions.add(this.titleService.title.subscribe(title => {
      this.title = title;
    }));

    this.subscriptions.add(this.titleService.dateTitle.subscribe(dateTitle => {
      this.dateTitle = dateTitle;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['']);
  }
}

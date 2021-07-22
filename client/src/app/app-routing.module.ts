import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './classes/auth.guard';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/page/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    loadChildren: () => import('./modules/cabinet/cabinet.module').then((m) => m.CabinetModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'statistics',
    loadChildren: () => import('./modules/statistics/statistics.module').then((m) => m.StatisticsModule),
    canActivate: [AuthGuard]
  },
  { path: '', component: AppComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/page/home/home.component';
import { SharedModule } from './modules/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { JournalComponent } from './components/page/journal/journal.component';
import { TokenInterceptor } from './classes/token.interceptor';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        JournalComponent,
        MainLayoutComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        RouterModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }

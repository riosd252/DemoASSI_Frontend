import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArrivingComponent } from './components/arriving/arriving.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartingComponent } from './components/departing/departing.component';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './authentication/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ManageTablesComponent } from './components/manage-tables/manage-tables.component';
import { StaffComponent } from './components/staff/staff.component';
import { CollapseComponent } from './components/collapse/collapse.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArrivingComponent,
    DepartingComponent,
    TableComponent,
    LoginComponent,
    NavbarComponent,
    UserProfileComponent,
    ManageTablesComponent,
    StaffComponent,
    CollapseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

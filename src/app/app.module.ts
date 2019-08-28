import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DatabaseService } from './services/database.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfigService, loadConfigurations } from './services/config.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { RoleGuardService } from './services/auth/role-guard.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AuthService } from './services/auth/auth.service';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './services/login.guard';
import { ModalBlogComponent } from './components/modal-blog/modal-blog.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MessagesComponent,
    AdminHomeComponent,
    UserHomeComponent,
    ModalBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule

  ],
  providers: [DatabaseService, ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigurations,
      deps: [ConfigService],
      multi: true
    },
    AuthGuardService,
    RoleGuardService,
    LoginGuard,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { RoleGuardService } from './services/auth/role-guard.service';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { LoginGuard } from './services/login.guard';
import { ProfileComponent } from './components/profile/profile.component';


export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login',      component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'register',      component: RegisterComponent, canActivate: [LoginGuard] }
];

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      // { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', component: UserHomeComponent,
      data: {userType: 'user'},
      canActivate: [RoleGuardService]

      },
      {
        path: 'admin', component: AdminHomeComponent,
        data: {userType: 'admin'},
        canActivate: [RoleGuardService]
      },
      {
        path: 'profile', component: ProfileComponent
      }
    ]
  },
  { path: '**',  redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

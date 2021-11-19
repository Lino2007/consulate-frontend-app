import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { NewsListComponent } from './public/news-list/news-list.component';
import {LoginComponent} from './public/login/login.component';
import {RegisterComponent} from './public/register/register.component';
import {HomeComponent} from './public/home/home.component';
import {DashboardComponent} from './public/dashboard/dashboard.component';
import {ProfileComponent} from './public/profile/profile.component';
import {AboutComponent} from './public/about/about.component';
import {ContactComponent} from './public/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'profile', component: ProfileComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'about', component: AboutComponent, pathMatch: 'full'},
  { path: 'contact', component: ContactComponent, pathMatch: 'full',  canActivate: [MsalGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { NewsListComponent } from './public/news-list/news-list.component';
import {LoginComponent} from './public/login/login.component';
import {RegisterComponent} from './public/register/register.component';
import {HomeComponent} from './public/home/home.component';
import {DashboardComponent} from './public/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [MsalGuard] },
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full',  canActivate: [MsalGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import {PasswordChangeComponent} from './public/password-change/password-change.component';
import {DocumentListComponent} from './public/document-list/document-list.component';
import {DocumentRequestsComponent} from './public/document-requests/document-requests.component';
import {ConsulsListComponent} from './public/consuls-list/consuls-list.component';
import {RolesListComponent} from './public/roles-list/roles-list.component';
import {PermissionsListComponent} from './public/permissions-list/permissions-list.component';
import {AddRoleComponent} from './public/add-role/add-role.component';
import {PopulationOverviewComponent} from './public/population-overview/population-overview.component';
import { RequestProcessingComponent } from './public/request-processing/request-processing.component';
import { AddConsulComponent } from './public/add-consul/add-consul.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'request-processing', component: RequestProcessingComponent, pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'profile', component: ProfileComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'about', component: AboutComponent, pathMatch: 'full'},
  { path: 'contact', component: ContactComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'change-password', component: PasswordChangeComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'document-request', component: DocumentRequestsComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'documents', component: DocumentListComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'consuls', component: ConsulsListComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'roles', component: RolesListComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'permissions', component: PermissionsListComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'add-role', component: AddRoleComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'population', component: PopulationOverviewComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  { path: 'add-consul', component: AddConsulComponent, pathMatch: 'full',  canActivate: [MsalGuard]},
  // dodati path request-processing
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

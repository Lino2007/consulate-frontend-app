import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { NewsListComponent } from './public/news-list/news-list.component';

const routes: Routes = [
  { path: '', component: NewsListComponent, pathMatch: 'full', canActivate: [MsalGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: MsalService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
    localStorage.setItem('Role', JSON.stringify(''));
    localStorage.setItem('Token', JSON.stringify(''));
    localStorage.setItem('Menu', JSON.stringify(null));
  }
}

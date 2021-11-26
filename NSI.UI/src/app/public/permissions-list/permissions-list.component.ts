import { Component, OnInit } from '@angular/core';
import {PermissionsService} from '../../private/services/permissions.service';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.css']
})
export class PermissionsListComponent implements OnInit {

  permissions: any[];

  constructor(
    private permissionsService: PermissionsService,
  ) { }

  ngOnInit(): void {
    this.permissionsService.goBackToLanding.subscribe((num: number) => {
      this.fetchPermissions();
    });

    this.fetchPermissions();
  }

  // tslint:disable-next-line:typedef
  fetchPermissions() {
    this.permissionsService.getPermissions().subscribe((res: any) => {
      this.permissions = res.data;
    });
  }
}

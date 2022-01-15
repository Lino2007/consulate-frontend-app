import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Role } from 'src/app/models/role.model';
import { EmployeeService } from 'src/app/private/services/employee.service';
import { RolesService } from 'src/app/private/services/roles.service';
import { UserService } from 'src/app/private/services/user.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users = [];
  update = false;
  selectedUserRoles = [];
  roles = [];
  selectedUser: any;
  selectedUserName!: string;
  deletedRoles = [];
  addedRoles = [];
  
  newRolesUnsaved = [];

  constructor(private notifierService: NotifierService,
    private roleService: RolesService,
    private userService: UserService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchEmployeesAndUsers();
  }

  // tslint:disable-next-line:typedef
  fetchEmployeesAndUsers() {
    this.employeeService.getEmployeesAndUsers().subscribe((res: any) => {
      console.log(res.data);
      this.users = res.data;
    });
  }

  updateUser(consul: any) {
    this.update = true;
    this.selectedUser = consul;
    this.selectedUserName = this.selectedUser.firstName + ' ' + this.selectedUser.lastName;
    this.roleService.getRoles().subscribe((res: any) => {
      this.roles = res.data;
    });
    this.userService.getUserRoles(this.selectedUser.email).subscribe((res: any) => {
      this.selectedUserRoles = [];
      this.selectedUserRoles = res.data;
      this.newRolesUnsaved = this.selectedUserRoles.map(x => Object.assign({}, x)); //deep copy of array of objects
    });
  }

  cancelUpdate(): void {
    this.update = false;
    this.update = false;
    this.addedRoles = [];
    this.deletedRoles = [];
    this.roles = [];
    this.newRolesUnsaved = [];
  }

  containsObjectRole(object, list) {
    return list.some(function(elem) {
      return elem.id === object.id;
    });
  }

  save() {
    this.newRolesUnsaved?.forEach((element,index)=>{
      if (this.containsObjectRole(element, this.selectedUserRoles) === false) {
        this.roleService.asignRoleToUser(element.id, this.selectedUser.id).subscribe((res: any) => {
        });
      }
    });
    this.selectedUserRoles.forEach((element, index) => {
      if (this.containsObjectRole(element, this.newRolesUnsaved) === false) {
        this.roleService.deleteRoleFromUser(element.id, this.selectedUser.id).subscribe((res: any) => {
        });;
      }
    });
    this.addedRoles = [];
    this.deletedRoles = [];
    this.roles = [];
    this.newRolesUnsaved = [];
    
    this.users = [];
    this.update = false;
    this.notifierService.notify('success', 'User updated successfully');
    this.fetchEmployeesAndUsers();
  }

  deleteRole(role: any): void {
    this.deletedRoles.push(role);
    this.newRolesUnsaved.forEach((element, index) =>  {
      if (element.id === role.id) {
        this.newRolesUnsaved.splice(index, 1);
      }
    });
  }

  addRole(role: any) {
    this.addedRoles.push(role);
    if (this.newRolesUnsaved.find((element) => element.id === role.id) === undefined) {
      this.newRolesUnsaved.push(role);
    }
  }

  validateEmployeeRole(roleId: string): boolean {
    return (this.newRolesUnsaved.find(element => element.id === roleId) !== undefined);
  }

}

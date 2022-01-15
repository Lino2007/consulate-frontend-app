import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Role } from 'src/app/models/role.model';
import { EmployeeService } from 'src/app/private/services/employee.service';
import { RolesService } from 'src/app/private/services/roles.service';
import { UserService } from 'src/app/private/services/user.service';


@Component({
  selector: 'app-consuls-list',
  templateUrl: './consuls-list.component.html',
  styleUrls: ['./consuls-list.component.css']
})
export class ConsulsListComponent implements OnInit {

  consuls = [];
  update = false;
  selectedConsulRoles = [];
  roles = [];
  selectedConsul: any;
  selectedConsulName!: string;
  deletedRoles = [];
  addedRoles = [];
  
  newRolesUnsaved = [];

  constructor(private employeeService: EmployeeService,
    private notifierService: NotifierService,
    private roleService: RolesService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.fetchConsuls();
  }

  // tslint:disable-next-line:typedef
  fetchConsuls() {
    this.employeeService.getConsuls().subscribe((res: any) => {
      this.consuls = res.data;
    });
  }

  deleteConsul(email: string, firstName: string, lastName:string){
    var question = "Want to delete consul " + firstName + " " + lastName + "?";
    var result = confirm(question);
    if(result){
      this.employeeService.deleteEmployee(email).subscribe((res: any) => {
        this.notifierService.notify('success','Employee deleted successfuly');
        this.fetchConsuls();
      });
    }
  }

  updateConsul(consul: any) {
    this.update = true;
    this.selectedConsul = consul;
    this.selectedConsulName = this.selectedConsul.firstName + ' ' + this.selectedConsul.lastName;
    this.roleService.getRoles().subscribe((res: any) => {
      this.roles = res.data;
    });
    this.userService.getUserRoles(this.selectedConsul.email).subscribe((res: any) => {
      this.selectedConsulRoles = [];
      this.selectedConsulRoles = res.data;
      this.newRolesUnsaved = this.selectedConsulRoles.map(x => Object.assign({}, x));
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

  containsObjectUser(object, list) {
    return list.some(function(elem) {
      return elem.email === object.email;
    });
  }

  containsObjectRole(object, list) {
    return list.some(function(elem) {
      return elem.id === object.id;
    });
  }

  save() {
    this.newRolesUnsaved?.forEach((element,index)=>{
      if (this.containsObjectRole(element, this.selectedConsulRoles) === false) {
        this.roleService.asignRoleToUser(element.id, this.selectedConsul.id).subscribe((res: any) => {
        });
      }
    });
    this.selectedConsulRoles.forEach((element, index) => {
      if (this.containsObjectRole(element, this.newRolesUnsaved) === false) {
        this.roleService.deleteRoleFromUser(element.id, this.selectedConsul.id).subscribe((res: any) => {
        });;
      }
    });
    this.addedRoles = [];
    this.deletedRoles = [];
    this.roles = [];
    this.newRolesUnsaved = [];
    
    this.consuls = [];
    this.update = false;
    this.notifierService.notify('success', 'Employee successfully updated!');  
    this.fetchConsuls();
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

import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { EmployeeService } from 'src/app/private/services/employee.service';


@Component({
  selector: 'app-consuls-list',
  templateUrl: './consuls-list.component.html',
  styleUrls: ['./consuls-list.component.css']
})
export class ConsulsListComponent implements OnInit {

  consuls = []

  constructor(private employeeService: EmployeeService,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.fetchConsuls();
  }

  // tslint:disable-next-line:typedef
  fetchConsuls() {
    /*this.consuls = [
      {
        firstName: "Emela",
        lastName: "Prezime",
        email: "emela@gmail.com",
        gender: "female",
        placeOfBirth: "Sarajevo",
        country: "Bosna"
      },
      {
        firstName: "Emela1",
        lastName: "Prezime1",
        email: "emela1@gmail.com",
        gender: "female",
        placeOfBirth: "Sarajevo1",
        country: "Bosna1"
      },
      {
        firstName: "Emela2",
        lastName: "Prezime2",
        email: "emela2@gmail.com",
        gender: "female",
        placeOfBirth: "Sarajevo2",
        country: "Bosna2"
      }
    ]*/
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
      /*this.consuls.forEach((value, index) => {
        if (value.email === email) {
          this.consuls.splice(index, 1);
        }
      });*/
    }
  }

}

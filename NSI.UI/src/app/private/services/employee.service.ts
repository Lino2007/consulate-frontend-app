import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

   // tslint:disable-next-line:typedef
  public getConsuls(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.get(environment.url + '/api/Employee', httpOptions);
  }

   // tslint:disable-next-line:typedef
  public deleteEmployee(employeeEmail: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      }),
    };
    return this.http.delete(environment.url + '/api/Employee/' + employeeEmail, httpOptions);
  }

  public addEmployee(body: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token')),
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      }),
    };
    return this.http.post(environment.url + '/api/Employee', JSON.stringify(body), httpOptions);
  }

  public getEmployeeIdByEmail(email: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.get(environment.url + '/api/Employee', httpOptions);
  }

  public getEmployeesAndUsers(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      })
    };
    return this.http.get(environment.url + '/api/Employee/all', httpOptions);
  }

}

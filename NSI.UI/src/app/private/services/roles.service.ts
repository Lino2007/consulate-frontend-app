import {Injectable, Output} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  @Output() goBackToLanding: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public getRoles(){
    return this.http.get(environment.url + '/api/Role');
  }

}

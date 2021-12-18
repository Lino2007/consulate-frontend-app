import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly path: string = '/api/Request';
  private page: Number = 0;
  private recordsPerPage: Number = 5;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
    })
  };
  
  constructor(private http: HttpClient) { }

  public getReqItems(page: Number, recordsPerPage: Number): Observable<object> {
    if (page < 0 && recordsPerPage < 0) {
      return null;
    }
    this.page = page;
    this.recordsPerPage = recordsPerPage;
    const pagingPath: string = `/paging?Paging.Page=${this.page}&Paging.RecordsPerPage=${this.recordsPerPage}`;
    return this.http.get(environment.url + this.path + pagingPath, this.httpOptions);
  }
  
    public updateRequestItem(body) {
      return this.http.put(environment.url + this.path, body, this.httpOptions);
    }

}


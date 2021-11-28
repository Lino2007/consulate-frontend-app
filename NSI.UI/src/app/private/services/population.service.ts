import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public getPopulation(){
    // return this.http.get(environment.url + '/api/Population');
  }
}

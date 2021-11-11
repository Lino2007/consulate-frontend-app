import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNewsArticles() {
    return [
      { title: "Naslov clanka #1", age: 3, comments: 50, content: "Neki sadrzaj clanka sadrzaj clankasadrzaj clankasadrzaj clanka"},
      { title: "Naslov clanka #2", age: 15, comments: 44, content: "Neki sadrzaj clanka sadrzaj clankasadrzaj clanka sadrzaj clanka"},
      { title: "Naslov clanka #3", age: 25, comments: 22, content: "Neki sadrzaj clanka sadrzaj clanka sadrzaj clanka sadrzaj clanka"}
    ];
  }

  getNewsFromAPI() {
    return this.http.get(environment.newsSource);
  }
}

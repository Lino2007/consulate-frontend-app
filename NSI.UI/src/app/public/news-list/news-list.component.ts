import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { NewsService } from 'src/app/private/services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  articles: Article[];
  anyArticles: any;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {

    this.newsService.getNewsFromAPI().subscribe((data: any) => {
      this.articles = data.articles as Article[];
    });
  }

}

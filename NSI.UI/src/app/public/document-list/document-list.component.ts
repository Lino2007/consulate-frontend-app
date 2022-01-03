import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../../private/services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.fetchDocument();
  }

  // tslint:disable-next-line:typedef
  fetchDocument() {
    this.documentService.getDocuments().subscribe((res: any) => {
      this.documents = res.data;
    });
  }

}

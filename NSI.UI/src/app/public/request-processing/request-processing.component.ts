import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { FullRequest, ShortReq } from 'src/app/models/request.model';
import { RequestService } from 'src/app/private/services/request.service';

@Component({
  selector: 'app-request-processing',
  templateUrl: './request-processing.component.html',
  styleUrls: ['./request-processing.component.css']
})
export class RequestProcessingComponent implements OnInit {
  requestPayload: FullRequest[];
  first: number = 5;
  rows: number = 5;
  loading: boolean = false;
  totalRecords: number = 0;
  RequestState: string[] = ["Approved", "Rejected", "Pending"];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getData();
  }

  loadNewPage(event: LazyLoadEvent): void {
    this.first = event.first + event.rows;
    this.rows = event.rows;
    this.getData();
  }

  private getData(): void {
    this.loading = true;
    this.requestService.getReqItems((this.first/this.rows), this.rows).subscribe(
      data => {
      if (data["success"] !== "Succeeded") {
        this.loading = false;
        return;
      }

      this.totalRecords = data["paging"]["totalRecords"];
      this.requestPayload = data["data"];
      this.loading = false;
    },
    error => {
      this.loading = false;
    });
  }

  onChange(event, req: ShortReq) {
    this.loading = true;
    this.requestService.updateRequestItem({id: req.id, requestState: event.value})
    .subscribe(response => {
      if (response["success"] !== "Succeeded") {
        this.loading = false;
        return;
      }
      req.state = event.value;
      this.loading = false;
    },
    error => {
      this.loading = false;
    });
  }
}

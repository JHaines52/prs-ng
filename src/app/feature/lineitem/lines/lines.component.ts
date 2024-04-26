import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineItem';
import { Request } from 'src/app/model/request';
import { LineitemService } from 'src/app/service/lineitem.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';


@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit {
  titlep: string = 'Purchase Request'
  title: string = 'Line Items';
  message?: string = undefined;
  lineItems: LineItem[] = [];
  username: string = '';
  requestId: number = 0;
  request: Request = new Request();


  constructor(private lineitemSvc: LineitemService,
    private systemSvc: SystemService,
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    this.route.params.subscribe({
      next: (params) => {
        this.requestId = params['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (params) => {
            this.request = params;
          },
          error: (err) => {
            console.log('Error getting Request: ', err);
          },
          complete: () => { },
        });

        this.lineitemSvc.getLinesForRequest(this.requestId).subscribe({
          next: (params) => {
            this.lineItems = params;
            console.log("lines component request:" + this.request);
          },
          error: (err) => {
            console.log('Error getting lines:', err.message);
          },
          complete: () => { },
        });
      },
    });
  }

  delete(id: number) {
    this.lineitemSvc.deleteLineItem(id).subscribe({
      next: (resp) => {
        if (resp == false) {
          console.log('LinesComponent - error deleting Lines.');
          this.message = 'LinesComponent - error deleting Lines.';
        } else {
          this.router.navigateByUrl('request/lines/id');
        }
      },//redirect back to the lines
      error: (err) => {
        console.log('Error deleting request: ' + err.message);
      },
      complete: () => { },
    });
  }
  submit() {
    this.requestSvc.submitRequestForReview(this.requestId).subscribe({
      next: (request) => {
        this.requestId = request['id']
        this.router.navigateByUrl('request/list')
      },
      error: (err) => {
        console.log('Error submitting request: ' + err.message);
      },
      complete: () => {
        console.log('Submission process complete.');
      }
    });
  }
}
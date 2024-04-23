import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineItem';
import { Request } from 'src/app/model/request';
import { User } from 'src/app/model/user';
import { LineitemService } from 'src/app/service/lineitem.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  titlep: string = 'Purchase Request-Approve/Reject';
  title: string = 'Line Items';
  loggedInUser: User = new User();
  request: Request = new Request();
  requestId: number = 0;
  lineItem: LineItem = new LineItem();
  userIsAdmin: boolean = false;
  userIsReviewer: boolean = false;
  message?: string = undefined;

  constructor(private requestSvc: RequestService,
    private lineitemSvc: LineitemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        let requestId = params['id'];
        this.requestSvc.getRequestById(requestId).subscribe({
          next: (params) => {
            this.request = params;
            this.lineitemSvc.getLineItemById(requestId).subscribe({
              next: (params) => {
                this.lineItem = params;

                console.log("request for approval:" + this.request);

              },
              error: (err) => {
                console.log('Error getting Lineitem:', err.message);
              },
              complete: () => { },
            });

          },
          error: (err) => {
            console.log('Error getting Request: ', err);
          },
          complete: () => { },
        });
      },


    });
  }


  approve(): void {
    this.route.params.subscribe({
      next: (params) => {
        let Id = params['id'];
        this.requestSvc.approveRequest(Id).subscribe({
          next: (resp) => {
            this.requestId = resp['id'];
            if (this.requestId) {
              this.router.navigateByUrl('/request/list');
            }
            else {
              console.log('request not found');
            }
          },
          error: (err) => {
            console.log('error getting request: ' + err.message);
          },
          complete: () => { }
        });
      }
    });

  }
  reject(): void {
    this.route.params.subscribe({
      next: (params) => {
        let Id = params['id'];
        this.requestSvc.rejectRequest(Id).subscribe({
          next: (resp) => {
            this.requestId = resp['id'];
            if (this.requestId) {
              this.router.navigateByUrl('/request/list');
            }
            else {
              console.log('request not found');
            }

          },
          error: (err) => {
            console.log('Error updating credit: ', err);
            this.message = 'Error updating Credit.';
          },
          complete: () => { },
        });
      },
    });

  }
}

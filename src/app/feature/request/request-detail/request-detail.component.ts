import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request';
import { LineitemService } from 'src/app/service/lineitem.service';
import { LineItem } from 'src/app/model/lineItem';


@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  title:string = 'Request Detail';
  request: Request = new Request();
  requestId: number = 0;
  message?: string = undefined;
  lineitems?: LineItem[] = undefined;
  exists: boolean = false;
  
    constructor(
      private requestSvc: RequestService,
      private router: Router,
      private route: ActivatedRoute, 
      private lineitemSvc: LineitemService
    ) { }

    ngOnInit() {
     
      // get the id from the url
      this.route.params.subscribe({
        next: (parms) => {
          this.requestId = parms['id'];
          this.requestSvc.getRequestById(this.requestId).subscribe({
            next: (parms) => {
              this.request = parms;
              this.checkForRequestExistence();
            },
          });
        },
        error: (err) => {
          console.log('Error editing Request: ', err);
        },
        complete: () => {},
      });
    }
  
    delete() {
      this.requestSvc.deleteRequest(this.requestId).subscribe({
        next: (resp) => {
          if (resp == false) {
            console.log('RequestDetailComponent - error deleting request.');
            this.message = 'RequestDetailComponent - error deleting request.';
          } else {
            this.router.navigateByUrl('request/list');
          }
        },
        error: (err) => {
          console.log('Error deleting request: ' + err.message);
        },
        complete: () => {},
      });
    }
    
    checkForRequestExistence(): void {
      this.lineitemSvc.getLinesForRequest(this.requestId).subscribe({
        next: (lineItems) => {
          this.exists = lineItems && lineItems.length > 0;
          // Update UI based on `this.exists`
        },
        error: (error) => {
          console.error('Error fetching line items:', error);
          this.exists = false; // Set false or adjust accordingly
        }
      });
    }
  }



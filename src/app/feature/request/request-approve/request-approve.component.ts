import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineItem';
import { Request } from 'src/app/model/request';
import { User } from 'src/app/model/user';
import { LineitemService } from 'src/app/service/lineitem.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  title: string = 'Request-Approve';
  loggedInUser: User = new User();
  request: Request = new Request ();
  requestId: number = 0;
  lineItems: LineItem[] = [];
  userIsAdmin: boolean = false;
  userIsReviewer: boolean = false;
  message?: string = undefined;

  constructor(private requestSvc: RequestService, 
              private lineItemSvc: LineitemService, 
              private systemSvc: SystemService, 
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (resp) =>{
            this.request = resp;
            this.lineItemSvc.getLinesForRequests(this.requestId).subscribe({
            next: (resp) => {
              this.lineItems = resp;
          }
        });
      },
      error: (err) =>{
        console.log('error getting li for request: ' + err.message);
      },
      complete: () => {}
    });
  },
  error: (err) =>{
    console.log('error getting request: ' + err.message);
  },
  complete: () => {}
});
}    
save(): void {
  // NOTE: Check for existence of credit title before save?
  this.requestSvc.updateRequest(this.request).subscribe({
    next: (resp) => {
      this.request = resp;
      this.router.navigateByUrl('/request/list');
    },
    error: (err) => {
      console.log('Error updating credit: ', err);
      this.message = 'Error updating Credit.';
    },
    complete: () => {},
  });

}
}

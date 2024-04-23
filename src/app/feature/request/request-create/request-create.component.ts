import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Request } from 'src/app/model/request';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = 'Request-Create';
  request: Request = new Request();
  loggedInUser: User = new User();
  userFullname = '';
  userLastname= '';
  message?: string = undefined;
  deliveryModes: string[] = ['pickup', 'delivery','magic','eagle']


  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private systemSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    if(this.systemSvc.loggedInUser){
      this.request.user = this.systemSvc.loggedInUser;
      this.userFullname = `${this.request.user.firstname} ${this.request.user.lastname}`;
      console.log("logged in user: "+ this.request.user.firstname);
    }

    }
  save(): void {
    // NOTE: Check for existence of request title before save?
    this.requestSvc.createRequest(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
        this.router.navigateByUrl('/request/list');
      },
      error: (err) => {
        console.log('Error creating request: ', err);
        this.message = 'Error creating Request.';
      },
      complete: () => {},
    });
  }


}

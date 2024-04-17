import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Request } from 'src/app/model/request';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = 'Request-Create';
  request: Request = new Request();
  loggedInUser: User = new User();
  userFirstname = '';
  userLastname= '';
  message?: string = undefined;
  deliveryModes: string[] = ['pickup', 'delivery','magic','eagle']

  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //force login 
    //this.systemSvc.userLogin
    //temporary code 
    this.userSvc.login(this.loggedInUser).subscribe({
      next: (resp) => {
       this.loggedInUser = resp;
        this.userFirstname = this.loggedInUser.firstname;
        this.userLastname = this.loggedInUser.lastname;
      },
      error: (err) => {
        console.log('Request Create - error getting users.');
      },
      complete: () => {},
    });
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

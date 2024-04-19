import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineItem';
import { Request } from 'src/app/model/request';
import { LineitemService } from 'src/app/service/lineitem.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit {
  title: string = 'Purchase Request Line items';
  lineItems: LineItem[] = [];
  username: string = '';
  requestId: number = 0;
  requests: Request[] = [];
  loggedInUser: User = new User();

  constructor(private lineitemSvc: LineitemService,
    private systemSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.loggedInUser;
    this.username = this.loggedInUser.firstname && this.loggedInUser.lastname;

    this.route.params.subscribe({
      next: (params) => {
        this.requestId = params['id'];
        this.lineitemSvc.getLinesForRequests(this.requestId).subscribe({
          next: (parms) => {
            this.lineItems = parms;
          },
             
          error: (err) => {
            console.log('Could not find request:', err)}
        });
      },
      complete: () => { }
    });


  }

}

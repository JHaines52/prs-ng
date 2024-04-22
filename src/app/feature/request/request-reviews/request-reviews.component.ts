import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Request } from 'src/app/model/request';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-reviews',
  templateUrl: './request-reviews.component.html',
  styleUrls: ['./request-reviews.component.css']
})
export class RequestReviewsComponent implements OnInit {
  title: string = 'Request-Reviews';
  requests: Request[] = [];
  //userId: number = 0;
  requestStatus: boolean = false;
  message?: string = undefined;

  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    // Ensuring loggedInUser is properly initialized from the service
    //this.userId = this.systemSvc.loggedInUserID ();
    this.systemSvc.checkLogin();
    //console.log("UserID = " + this.userId);
    

    this.route.params.subscribe({
      next: (urlParams) => {
        let userId = urlParams['id'];
        this.requestSvc.getRequestInReview(userId).subscribe({
          next: (response) => {
            this.requests = response.filter(requests =>
              requests.status.toLowerCase() === 'review' &&
              requests.user.id !== userId
            );
          },
          error: (err) => console.error('Failed to fetch requests:', err)

        });

      },
      error: (err) => {
        console.error('Error retrieving id', err.message);
      },
      complete: () => { },

    });

  }
}
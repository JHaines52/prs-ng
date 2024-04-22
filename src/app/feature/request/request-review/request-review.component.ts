import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title: string = 'Review';
  message?: string = undefined;

  constructor(private requestSvc: RequestService,
    private systemSvc: SystemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.systemSvc.checkLogin()

    this.route.params.subscribe({
      next: (params) => {
        let requestId = params['id'];
        this.requestSvc.submitRequestForReview(requestId).subscribe({
          next: (updatedRequest) => {

            console.log('Request updated:', updatedRequest);
            // Handle the updated request, e.g., update the UI or display a success message
          },
          error: (err) => {
            console.error('Error updating request:', err.message);
          },
          
        });
      },
      error: (err) =>{
        console.error('Error retrieving id ', err.message)
      },
      complete: () =>{},
    })
  }
}


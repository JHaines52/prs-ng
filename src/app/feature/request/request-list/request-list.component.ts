import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/lineItem';
import { Request } from 'src/app/model/request';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  title: string = 'Request-List';
  requests?: Request[] = undefined;
  lineitem: LineItem = new LineItem();
  showAddIcon: boolean = false;

  constructor(private requestSvc: RequestService,
    private systemSvc: SystemService
  ) { }

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    this.showAddIcon = this.systemSvc.isAdmin();

    this.requestSvc.getAllRequests().subscribe({

      next: (resp) => {
        this.requests = resp;

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { }
    });

  }

}


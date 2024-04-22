import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  title: string = 'User-List';
  users?: User[] = undefined;
  loggedInUser: User = new User();
  showAddIcon: boolean = false;

  constructor(private userSvc: UserService,
    private systemSvc: SystemService
  ) { }

  ngOnInit(): void {
    
    this.showAddIcon = this.systemSvc.isAdmin();
    this.userSvc.getAllUsers().subscribe({
      next: (resp) => {
        this.users = resp;


      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { }
    });

    

  }
  canEdit(): boolean {
    return this.systemSvc.isReviewer();
  }
  updateRole(): boolean {
    return this.systemSvc.isAdmin();
  }


}


import { Component, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
users = [{username: "", password: ""}];
  title:string = 'User Detail';
  user: User = new User();
  userId: number = 0;
  message?: string = undefined;

  
    constructor(
      private userSvc: UserService,
      private router: Router,
      private route: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      this.route.params.subscribe({
        next: (parms) => {
          this.userId = parms['id'];
          this.userSvc.getUserById(this.userId).subscribe({
            next: (parms) => {
              this.user = parms;
            },
            error: (err) => {
              console.log('Error getting user by id: ', err);
            },
            complete: () => {}
          });
        },
        error: (err) => {
          console.log('Error getting id from url: ', err)
        },
        complete: () => {},
      });
    }
    delete() {
      this.userSvc.deleteUser(this.userId).subscribe({
        next: (resp) => {
          if (resp == false) {
            console.log('UserDetailComponent - error deleting user.');
            this.message = 'UserDetailComponent - error deleting user.';
          } else {
            this.router.navigateByUrl('user/list');
          }
        },
        error: (err) => {
          console.log(
            'UserDetailComponent - Error deleting user: ' + err.message
          );
          this.message =
            'UserDetailComponent - error deleting user: ' + err.message;
        },
        complete: () => {},
      });

     
    }
    maskPassword(password:string): string {
      return '************';
    }
  
  
  }
  
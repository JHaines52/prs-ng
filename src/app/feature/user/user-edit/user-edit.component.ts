import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
[x: string]: any;
title: string = 'User-Edit'
user: User = new User();
userId: number = 0
message?: string = undefined;

  constructor(private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: parms => {
        this.userId = parms["id"];
        this.userSvc.getUserById(this.userId).subscribe({
          next: parms => {
            this.user = parms;
          }
        });
      },
      error: (err) => {
        console.log("Error editing User: ", err);
      }
    })
  }
  save(): void{
    this.userSvc.updateUser(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user/list');
      },
      error: (err) =>{
        console.log("Error updating user: ", err);
        this.message = "Error updating User.";
      },
      complete: () => { }
    })
  }

}

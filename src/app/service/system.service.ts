import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class SystemService {
//  private loggedUser!: User;
 loggedInUser: User = new User;
 
  constructor(private router: Router ) { }

  checkLogin(): void {

    if (this.loggedInUser.id == 0) {
      console.log('User is not logged in');
      this.router.navigateByUrl('/user/login');
    }
  }

  // get loggedinUser(): User {
  //   return this.loggedUser;
  // }

  isUserLoggedIn(): boolean {
    return this.loggedInUser && this.loggedInUser.id > 0;
  }
  isReviewer(): boolean {
    if(this.loggedInUser.admin == false){
      return  false;
    }
    return true;
  }

  isAdmin(): boolean {
    if(this.loggedInUser.reviewer == false){
      return false;
    }
    return true;
  }
  checkAdmin(): void {
    if (!this.isAdmin()) {
      console.log('User not an Admin');
      this.router.navigateByUrl('/user/list');
    }
  }

  checkReviewer(): void {
    if (!this.isReviewer()) {
      console.log('User not a Reviewer');
      this.router.navigateByUrl('/user/list');
    }
  }


}
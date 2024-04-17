import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title: string = "";
menuItems: MenuItem[] = [];
welcomeMsg?: string = undefined;

  constructor(private systemSvc: SystemService) { }

  ngOnInit(): void {
    this.menuItems=[
      new MenuItem ('Home', '/home', 'Home Page'),
      new MenuItem ('User', '/user/list', 'User List'),
      new MenuItem ('Vendor', '/vendor/list', 'Vendor List'),
      new MenuItem('Product', '/product/list', 'Product List'),
      new MenuItem('Request', '/request/list', 'Request List')

    ];


//populates a message when the user is logged in 
if (this.systemSvc.isUserLoggedIn()){
  this.menuItems.push(new MenuItem('Logout', '/user/login', 'User Logout'));
  if(this.systemSvc.loggedInUser){
    this.welcomeMsg = "Welcome, "+this.systemSvc.loggedInUser.firstname;
  } else{
    this.welcomeMsg = " ";
  }
  
}else{
    this.menuItems.push(new MenuItem('Login', '/user/login', 'User Login' ));
    
  }
}

  }


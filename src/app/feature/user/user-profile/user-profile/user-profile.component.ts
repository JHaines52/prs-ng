import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { Request } from 'src/app/model/request';
import { LineItem } from 'src/app/model/lineItem';
import { Product } from 'src/app/model/product';
import { LineitemService } from 'src/app/service/lineitem.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  title: string = 'User Profile'
  message?: string = undefined;
  lineItems: LineItem[] = [];
  products: Product[] = [];
  requests: Request[] = [];
  username: string = '';
  userId: number = 0;
  user: User = new User();
  currentIndex = 0;

  constructor(private userSvc: UserService,
    private lineitemSvc: LineitemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.userId = params['id'];
        this.userSvc.getUserById(this.userId).subscribe({
          next: (params) => {
            this.user = params;

          },
          error: (err) => {
            console.log('Error getting User: ', err);
          },
          complete: () => { },
        });
        this.requestSvc.getRequestsByUserId(this.userId).subscribe({
          next: (reqs) => {
            this.requests = reqs;
            this.lineitemSvc.getAllLineItems().subscribe({
              next: (lines) => {
                this.lineItems = lines;
                this.productSvc.getAllProducts().subscribe({
                  next: (prod) => {
                    // Process each request to find its corresponding products
                    this.requests.forEach(request => {
                      // Filter line items that belong to the current request
                      const relevantLineItems = lines.filter(lineItem => lineItem.request.id === request.id);
                      // Extract product IDs from these line items
                      const productIds = relevantLineItems.map(item => item.product.id);
                      // Filter products that match the product IDs from the line items
                      const matchedProducts = prod.filter(product => productIds.includes(product.id));
                      // Optionally, store the matched products in the request object or handle them as needed
                     this.products = matchedProducts;
                    });
                  },
                  error: (err) => {
                    console.log('Error getting products:', err.message);
                  },
                  complete: () => { },
                });
              },
              error: (err) => {
                console.log('Error getting lines:', err.message);
              },
              complete: () => { },
            });
          },
          error: (err) => {
            console.log('Error getting requests:', err.message);
          },
          complete: () => { },
        });

      },
    });
  }
  navigate(direction: string): void {
    if (this.lineItems.length === 0) return; // Exit if there are no products to navigate through

    if (direction === 'next') {
      this.currentIndex = (this.currentIndex + 1) % this.lineItems.length;
    } else if (direction === 'prev') {
      this.currentIndex = (this.currentIndex - 1 + this.lineItems.length) % this.lineItems.length;
    }
  }
}


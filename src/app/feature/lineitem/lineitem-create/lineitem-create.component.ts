import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineItem';
import { Product } from 'src/app/model/product';
import { Request } from 'src/app/model/request';
import { LineitemService } from 'src/app/service/lineitem.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';
import { VendorService } from 'src/app/service/vendor.service';
import { Vendor } from 'src/app/model/vendor';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-lineitem-create',
  templateUrl: './lineitem-create.component.html',
  styleUrls: ['./lineitem-create.component.css']
})
export class LineitemCreateComponent implements OnInit {
  request: Request = new Request();
  loggedInUser: User = new User();
  id: number = 0;
  title: string = 'Lineitem-Create';
  lineitem: LineItem = new LineItem();
  products: Product[] = [];
  vendors: Vendor[] = [];
  message?: string = undefined;

  constructor(
    private lineitemSvc: LineitemService,
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parms) => {
       this.id = parms['id'];
        if (this.id) {
          this.RequestDetails();
          this.loadProducts();
          this.loadVendors();
        }
      },
      error: (err) => {
        console.log('Error with route parameters: ', err.message)
      },
    });
    
  }

  RequestDetails(): void {
        this.requestSvc.getRequestById(this.id).subscribe({
          next: (resp) => {
            this.request = resp;
            this.lineitem.request = this.request;
          },
          error: (err) => {
            console.log('Error editing request: ', err.message);
          },
          complete: () => { },
        });
      }
      

  loadProducts(): void {
    this.productSvc.getAllProducts().subscribe({
      next: (prod) => {
        this.products = prod;
      },
      error: (err) => {
        console.log('Error getting products.', err.message);
      },
      complete: () => { },
    });
  }
  loadVendors(): void {
    this.vendorSvc.getAllVendors().subscribe({
      next: (vend) => {
        this.vendors = vend;

      },
      error: (err) => {
        console.log('Error getting vendors.', err.message);
      },
      complete: () => { },
    });
  }

  save(): void {
    this.lineitemSvc.createLineItem(this.lineitem).subscribe({
      next: (resp) => {
        this.lineitem = resp;
        this.router.navigateByUrl('/request/lines/'+this.id);
      },
      error: (err) => {
        console.log('Error creating lineitem: ', err);
        this.message = 'Error creating lineitem.';
      },
      complete: () => { },
    });
  }

  compareWithProd(p: Product, v: Vendor): boolean {
    return p && v && p.id === v.id;
  }
}


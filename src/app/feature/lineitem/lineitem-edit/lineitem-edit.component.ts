import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { LineItem } from 'src/app/model/lineItem';
import { Request } from 'src/app/model/request';
import { LineitemService } from 'src/app/service/lineitem.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-lineitem-edit',
  templateUrl: './lineitem-edit.component.html',
  styleUrls: ['./lineitem-edit.component.css']
})
export class LineitemEditComponent implements OnInit {
  title: string = 'Lineitem-Edit';
  lineitem: LineItem = new LineItem();
  lineitemId: number = 0;
  requests: Request = new Request();
  products: Product = new Product();
  message?: string = undefined;

  constructor(
    private lineitemSvc: LineitemService,
    private requestSvc: RequestService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parms) => {
        this.lineitemId = parms['id'];
        this.lineitemSvc.getLineItemById(this.lineitemId).subscribe({
          next: (parms) => {
            this.lineitem = parms;
            if (this.lineitem.request) { // assuming requestId is a field in LineItem
              this.requestSvc.getRequestById(this.lineitem.request.id).subscribe({
                next: (request) => {
                  this.requests = request;
                },
                error: (err) => console.log('Error getting request:', err)
              });
            }
            if (this.lineitem.product) { // assuming productId is a field in LineItem
              this.productSvc.getProductById(this.lineitem.product.id).subscribe({
                next: (product) => {
                  this.products = product;
                },
                error: (err) => console.log('Error getting product:', err)
              });
            }
          },
          

        });
      },
      error: (err) => {
        console.log('Error editing Lineitem: ', err);
      },
      complete: () => {},
    });

  }
 

  save(): void {
    // NOTE: Check for existence of lineitem title before save?
    this.lineitemSvc.updateLineItem(this.lineitem).subscribe({
      next: (resp) => {
        this.lineitem = resp;
        this.router.navigateByUrl('/request/list');
      },
      error: (err) => {
        console.log('Error updating lineitem: ', err);
        this.message = 'Error updating Lineitem.';
      },
      complete: () => {},
    });
  }
 
}


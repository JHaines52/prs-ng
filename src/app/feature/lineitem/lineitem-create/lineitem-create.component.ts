import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineItem';
import { Product } from 'src/app/model/product';
import { LineitemService } from 'src/app/service/lineitem.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-lineitem-create',
  templateUrl: './lineitem-create.component.html',
  styleUrls: ['./lineitem-create.component.css']
})
export class LineitemCreateComponent implements OnInit {

  title: string = 'Lineitem-Create';
 lineitem: LineItem = new LineItem();
  products: Product[] = [];
  message?: string = undefined;

  constructor(
    private lineitemSvc: LineitemService,
    private productSvc: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productSvc.getAllProducts().subscribe({
      next: (resp) => {
        this.products = resp;
      },
      error: (err) => {
        console.log('Product Create - error getting products.');
      },
      complete: () => {},
    });
   
  }
  save(): void {
    // NOTE: Check for existence of product title before save?
    this.lineitemSvc.createLineItem(this.lineitem).subscribe({
      next: (resp) => {
        this.lineitem = resp;
        this.router.navigateByUrl('/list-for-product/list');
      },
      error: (err) => {
        console.log('Error creating product: ', err);
        this.message = 'Error creating Product.';
      },
      complete: () => {},
    });
  }


}

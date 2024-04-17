import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  title:string = 'Product Detail';
  product: Product = new Product();
  productId: number = 0;
  message?: string = undefined;
  
    constructor(
      private productSvc: ProductService,
      private router: Router,
      private route: ActivatedRoute
    ) { }

    ngOnInit() {
      // get the id from the url
      this.route.params.subscribe({
        next: (parms) => {
          this.productId = parms['id'];
          this.productSvc.getProductById(this.productId).subscribe({
            next: (parms) => {
              this.product = parms;
            },
          });
        },
        error: (err) => {
          console.log('Error editing Product: ', err);
        },
        complete: () => {},
      });
    }
  
    delete() {
      this.productSvc.deleteProduct(this.productId).subscribe({
        next: (resp) => {
          if (resp == false) {
            console.log('ProductDetailComponent - error deleting product.');
            this.message = 'ProductDetailComponent - error deleting product.';
          } else {
            this.router.navigateByUrl('product/list');
          }
        },
        error: (err) => {
          console.log('Error deleting product: ' + err.message);
        },
        complete: () => {},
      });
    }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  [x: string]: any;
  title: string = 'Product-Edit'
  product: Product = new Product();
  productId: number = 0
  message?: string = undefined;
  
    constructor(private productSvc: ProductService,
      private router: Router,
      private route: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      this.route.params.subscribe({
        next: parms => {
          this.productId = parms["id"];
          this.productSvc.getProductById(this.productId).subscribe({
            next: parms => {
              this.product = parms;
            }
          });
        },
        error: (err) => {
          console.log("Error editing Product: ", err);
        }
      })
    }
    save(): void{
      this.productSvc.updateProduct(this.product).subscribe({
        next: (resp) => {
          this.product = resp;
          this.router.navigateByUrl('/product/list');
        },
        error: (err) =>{
          console.log("Error updating product: ", err);
          this.message = "Error updating Product.";
        },
        complete: () => { }
      })
    }
  
  }

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']

})
export class ProductListComponent implements OnInit {

  title: string = 'Product-List';
  products?: Product[] = undefined;


  constructor(private productSvc: ProductService,
    private vendorSvc: VendorService,

  ) { }

  ngOnInit(): void {
    this.productSvc.getAllProducts().subscribe({
      next:(resp) => {
        this.products = resp;
        
      },
      error: (err) =>{
        console.log(err);
      },
      complete: () => {}


    });
    
    
  }

}

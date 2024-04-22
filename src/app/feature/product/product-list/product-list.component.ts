
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']

})
export class ProductListComponent implements OnInit {
  showAddIcon: boolean = false;
  title: string = 'Product-List';
  products: any[] = [];
  currentIndex = 0;

  constructor(private productSvc: ProductService,
    private systemSvc: SystemService

  ) { }

  ngOnInit(): void {
    this.showAddIcon = this.systemSvc.isAdmin();
    this.productSvc.getAllProducts().subscribe({
      next:(resp) => {
        this.products = resp;
        if (this.products.length > 0){
          this.currentIndex = 0;
        }
        this.navigate;
        
      },
      error: (err) =>{
        console.log(err);
      },
      complete: () => {}


    });
    
    
  }
  navigate(direction: string): void {
    if (this.products.length === 0) return; // Exit if there are no products to navigate through
    
    if (direction === 'next') {
      this.currentIndex = (this.currentIndex + 1) % this.products.length;
    } else if (direction === 'prev') {
      this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
    }
  }

  
}


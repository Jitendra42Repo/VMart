import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/service/product.service';

import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { title } from 'process';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{

  products$: Product [];

  filteredProduct: any [];

  subscription: Subscription;

  source : LocalDataSource;

  settings = {
    mode:'external',
    actions: {
      columnTitle: 'Actions',
      custom: [ { name: 'Edit', type: 'html', 
        title: "<a >Edit</a>" } ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    },

    columns: {
      title: {
        title: 'Title',
        filter: false
      },
      price: {
        title: 'Price',
        filter: false
      }
    }
  };

  constructor(private productService: ProductService, private route: Router) {
    this.subscription = productService.getProducts().subscribe(products => {
            this.filteredProduct = this.products$ = products;
            this.source = new LocalDataSource(products);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
  
  onCustomAction(event: any){
    if(event.action == 'Edit'){
      this.route.navigate(['/admin/products/', event.data.$key]);
    }
  }

  filter(query: string) {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'title',
        search: query
      },
      {
        field: 'price',
        search: query
      }
    ], false); 

    if(!query) this.source.reset(false);
  }

  /*
  filter(query:string){
    console.log(query);
    
    this.filteredProduct = query ? this.products$.filter(p => 
        (p.title).toLowerCase().includes(query.toLowerCase()) ) : this.products$ ;
  } */

}

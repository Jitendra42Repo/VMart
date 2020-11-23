import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/Product';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {

  products :Product [] ;
  filteredProducts: Product [];
  categories$;
  category: string;

  constructor(productServices: ProductService, categoryServices:CategoryService, 
    route: ActivatedRoute) {
    
    productServices.getProducts().switchMap(products => {
      this.products = products;
      return route.queryParamMap;
      }).subscribe(param => {
          this.category = param.get('category');

          this.filteredProducts = (this.category) ? 
                  this.products.filter(product => product.category.toLowerCase() === this.category) 
                  : this.products; 
      });

    this.categories$ = categoryServices.getCategories();

  }


}

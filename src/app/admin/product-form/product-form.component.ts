import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy {
  
  categories$: any;

  product: {};

  productKey: string;


  constructor(categoryService: CategoryService, 
    private router: ActivatedRoute,
    private productServices: ProductService,
    private route: Router) {

    this.categories$ = categoryService.getCategories();

    this.productKey= this.router.snapshot.paramMap .get('id');
    console.log('Product Key: ' +this.productKey);
      
    if(this.productKey){
      this.product = this.productServices.getProduct(this.productKey).take(1)
      .subscribe(p => this.product = p);
    }
    else this.product = {};

  }

  ngOnDestroy(): void {
    
  }

  save(product:any){
    if(this.productKey) this.productServices.update(this.productKey, product); // Update Product
    else this.productServices.create(product);                                 // New Product

    this.route.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm("Do you want to delete it ?")) return ;
    this.productServices.deleteProduct(this.productKey);
    this.route.navigate(['/admin/products']);
  }

}

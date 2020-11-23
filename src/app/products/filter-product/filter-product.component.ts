import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent {
  
  categories$;

  @Input('category') category: string;


  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();

  }


}

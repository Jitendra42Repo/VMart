import { Component, Input } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('showActions') showActions= true;

  constructor(private cartService: ShoppingCartService) {

  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

}
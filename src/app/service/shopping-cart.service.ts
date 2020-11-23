import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Product } from '../model/Product';
import 'rxjs/add/operator/take'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private createCart(){
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });

  }

  private async getOrCreateCartId(){

    let cartId = localStorage.getItem('cartId');
    // Return cartId from local storage.
    if(cartId) return cartId;

    // Create the Shopping Cart in DB and return .
    let cart = await this.createCart();
    localStorage.setItem('cartId', cart.key);
    return cart.key;
  }

  private getProduct(cartId: string, productkey: string){
    return this.db.object('/shopping-cart/'+cartId+'/products/'+productkey);
  }

  async addToCart(product: Product){
    //1. Get or create Cart from localStorage or FireBaseDB.
    let cartId = await this.getOrCreateCartId();
    console.log('cartId obtained.');

    //2. Get the Item from FireBaseDB.
    let product$ = await this.getProduct(cartId, product.$key);

    product$.$ref.once('value', snapshot =>{
      if(snapshot.exists()) {
        product$.update( {quantity: ( snapshot.child('/quantity').val() ) + 1 } ); 
        console.log('quantity updated.'); 
      }
      else { product$.update( { product: product, quantity: 1 } ); console.log('product added.'); }

    });

  }










  /*private getQuantity(cartId: string, productkey: string ){
     return this.db.object('/shopping-cart/'+cartId+'/dateCreated' )
      //.$ref.orderByChild('/products').equalTo(cartId).once('value', snapshot =>{
        .$ref.once('value', snapshot =>{
        if(snapshot.exists()) { 
           console.log('snapShot: '+snapshot.val()); 
           return true; 
        }

        console.log('snapshot not found !');
        return false;
      }); 
    return this.db.object('/shopping-cart/'+cartId+'/products/'+productkey+'/quantity' );

  }*/


  

}

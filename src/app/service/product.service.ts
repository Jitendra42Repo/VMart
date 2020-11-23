import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from '../model/Product';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
    return this.db.list('/products').push(product);
  }

  getProducts():Observable<Product[]>{
    return this.db.list('/products');
  }

  getProduct(productkey:string){
    return this.db.object('/products/'+ productkey);
  }

  update(productKey:string, product:any){
    return this.db.object('/products/'+ productKey).update(product);
  }

  deleteProduct(productKey:string){
    this.db.object('/products/'+ productKey).remove();
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { VmNavbarComponent } from './vm-navbar/vm-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { AuthService } from './service/authservice.service';
import { AuthGaurdService } from './service/authgaurd.service';
import { AdminAuthGaurdService } from './service/admin-auth-gaurd.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './service/category.service';

import { ProductService } from './service/product.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FilterProductComponent } from './products/filter-product/filter-product.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ShoppingCartService } from './service/shopping-cart.service';

@NgModule({
  declarations: [
    AppComponent,
    VmNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    FilterProductComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    Ng2SmartTableModule,
    
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      { path:'', component: ProductsComponent},
      { path:'products', component: ProductsComponent},
      { path:'shopping-cart', component: ShoppingCartComponent},
      { path:'login', component: LoginComponent},

      { path:'check-out', component:CheckOutComponent, canActivate:[AuthGaurdService] },
      { path:'order-success', component: OrderSuccessComponent, canActivate:[AuthGaurdService] },
      { path:'my-orders', component: MyOrdersComponent, canActivate:[AuthGaurdService] },
      
      { path:'admin/products/new', component: ProductFormComponent, 
              canActivate:[AuthGaurdService, AdminAuthGaurdService] },
      { path:'admin/products/:id', component: ProductFormComponent, 
              canActivate:[AuthGaurdService, AdminAuthGaurdService] },
      { path:'admin/products', component: AdminProductsComponent, 
              canActivate:[AuthGaurdService, AdminAuthGaurdService] },
              
      { path:'admin/orders', component: AdminOrdersComponent, 
              canActivate:[AuthGaurdService,  AdminAuthGaurdService] }   
    ])
  ],
  providers: [
    AuthService,
    AuthGaurdService,
    AdminAuthGaurdService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

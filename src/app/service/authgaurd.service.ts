import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './authservice.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.auth.user$.map( user => {
      if(user) return true;
    
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url} });
      return false;
      
    });
  }

  

}

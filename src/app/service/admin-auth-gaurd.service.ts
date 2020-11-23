import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authservice.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AppUser } from '../model/AppUser';
import { AppUserService } from './app-user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService implements CanActivate {

  constructor(private auth: AuthService, private usrSvc: AppUserService) { }
  /*
  canActivate(): Observable<boolean>{
    console.log(" AdminAuthGaurdService: canActivate ?  ");
    return this.auth.appUser$.map( appUser => appUser.isAdmin );
  } */

  canActivate(): Observable<boolean>{
    return this.auth.appUser$
      .map(appUsr => {
        if(appUsr) {
          console.log('isAdmin ? '+ appUsr.isAdmin);
          return appUsr.isAdmin;
        } 
        
        return false;
        
      });
  }


  //https://stackoverflow.com/questions/39442513/angular2-canactivate-guard-not-working 

  //Fixing the canAdminActivate

}
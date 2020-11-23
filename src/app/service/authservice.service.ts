import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from './app-user.service';
import { AppUser } from '../model/AppUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private usrSvc: AppUserService,
    private angFireAuth: AngularFireAuth, 
    private route: ActivatedRoute, 
    private router: Router) {
      
      this.user$= this.angFireAuth.authState; 
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem("returnUrl", returnUrl);
    this.angFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.angFireAuth.auth.signOut();
    this.router.navigate(['/']);
  } 

  // Using switchMap we are transforming "Observable<firebase.User>" to "Observable<AppUser>"
  get appUser$():Observable<AppUser>{
    // usrSvc returns FirebaseObjectObservable<AppUser>
    return this.user$.switchMap( user => {
      if(user) {
        return this.usrSvc.get(user.uid) ;
      }
      return Observable.of(null);
    });
  
  }

}
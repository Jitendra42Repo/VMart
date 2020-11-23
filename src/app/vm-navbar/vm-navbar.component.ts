import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AppUser } from '../model/AppUser';

import { AuthService } from '../service/authservice.service';

@Component({
  selector: 'vm-navbar',
  templateUrl: './vm-navbar.component.html',
  styleUrls: ['./vm-navbar.component.css']
})
export class VmNavbarComponent {
  
  /*
  user$ : Observable<firebase.User>;

  constructor(private angFireAuth: AngularFireAuth) {
    this.user$= this.angFireAuth.authState; 
  }
  
  logout(){
    //this.auth.logout();
    this.angFireAuth.auth.signOut();
  } 
  /*
  logout(){
    console.log("Logout");
  }
  */

  appUser: AppUser;

  constructor(private auth: AuthService){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout(){
    this.auth.logout();
  }

}

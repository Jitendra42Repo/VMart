import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';
import { AuthService } from '../service/authservice.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  constructor(private auth: AuthService){ }

  login(){
    this.auth.login();
  }

  /*
  constructor(private angFireAuth: AngularFireAuth){}

  login(){
    //this.auth.login();
    //console.log("Login");
    return this.angFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  } 
  */

  

  

}
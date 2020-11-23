import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppUser } from '../model/AppUser';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    this.db.object('/users/'+ user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string):FirebaseObjectObservable<AppUser>{
    return this.db.object('/users/'+ uid);
  }



}
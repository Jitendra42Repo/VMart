import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUserService } from './service/app-user.service';
import { AuthService } from './service/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private auth: AuthService, private router: Router, private usersvc: AppUserService){
    this.auth.user$.subscribe(user =>{

      if(!user) return;
      /* 
      Use Case: User might changes name outside in google, which is outside the applications scope.
      Thus, everytime User Login, persist the Name && Email to DB.
      */
      this.usersvc.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if(!returnUrl) return ;
        
      this.router.navigate([returnUrl]);
      localStorage.removeItem('returnUrl');
    })
  }
} 
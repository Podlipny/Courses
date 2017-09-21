import { Component } from '@angular/core';
import {UserService} from '../adminShared/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 })
 
export class LoginComponent { 
  email: string;
  password1: string;
  
  constructor(private userSVC: UserService, private router: Router){}

  login(){
    this.userSVC.login(this.email, this.password1);
    this.userSVC.verifyUser();
  }

  signup(){
    this.router.navigate(['/admin/signup']);
  }

  cancel(){
    this.router.navigate(['']);
  }



}
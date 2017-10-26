import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { UserRepositoryService } from '../core/user-repository.service'

@Component({
  styleUrls: ['./register.component.css'],
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  registerForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  saving:boolean=false;

  constructor(private router:Router, private userRepository:UserRepositoryService) { }

  ngOnInit() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.registerForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
  }

  registerUser(user) {
    this.saving=true;
    this.saveAndRedirect(user);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  private saveAndRedirect(user) {
    this.userRepository.saveUser(user)
    .subscribe(
      null,
      ()=>this.saving=false,
      () => this.router.navigate(['/catalog']));
  }
}

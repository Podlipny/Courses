import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
    registerData = {}

    constructor(private authService: AuthService) { }

    post() {
        console.log(this.registerData)
        this.authService.registerUser(this.registerData)
    }
}

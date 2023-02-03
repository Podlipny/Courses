import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'login',
  template: `
      <md-card>
        <md-card-header>
            <md-card-title>
                <h4>Login</h4>
            </md-card-title>
        </md-card-header>
        <md-card-content>
            <form>
            <md-input-container>
                <input [(ngModel)]="loginData.email" name="email" mdInput placeholder="email" type="email">
            </md-input-container>
            <md-input-container>
                <input [(ngModel)]="loginData.pwd" name="password" mdInput placeholder="password" type="password">
            </md-input-container>
            <button (click)="post()" md-raised-button color="primary">Login</button>
            </form>
        </md-card-content>
      </md-card>
  `
})
export class LoginComponent {
    loginData = {}

    constructor(private authService: AuthService) { }

    post() {
        this.authService.loginUser(this.loginData)
    }
}

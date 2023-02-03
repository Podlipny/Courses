import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar>
      <button md-button routerLink="/">PSSocial</button>
      <button md-button routerLink="/users">Users</button>
      <span style="flex: 1 1 auto"></span>
      <button md-button *ngIf="!authService.isAuthenticated" routerLink="/register">Register</button>
      <button md-button *ngIf="!authService.isAuthenticated" routerLink="/login">Login</button>
      <button md-button *ngIf="authService.isAuthenticated" (click)="authService.logout()">Logout</button>
    </md-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(private authService: AuthService) { }
  
  title = 'my app';
}

import { Component } from '@angular/core';
import { ApiService } from './api.service'

@Component({
    selector: 'users',
    template: `
        <div *ngFor="let user of apiService.users">
          <md-card [routerLink]="['/profile', user._id]" style="cursor: pointer">{{user.name}}</md-card>
        </div>
    `
})
export class UsersComponent {
    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getUsers();
    }
}

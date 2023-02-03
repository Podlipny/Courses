import { Component } from '@angular/core';
import { ApiService } from './api.service'

@Component({
    selector: 'post',
    template: `
    <md-card>
    <md-card-header>
        <md-card-title>
            <h4>New Post</h4>
        </md-card-title>
    </md-card-header>
    <md-card-content>
        <form>
            <md-input-container style="width: 100%">
                <textarea [(ngModel)]="postMsg" name="description" mdInput placeholder="Post Message"></textarea>
            </md-input-container>
            <br>
            <button (click)="post()" md-raised-button color="primary">Post</button>
        </form>
    </md-card-content>
</md-card>
    `
})
export class PostComponent {
    constructor(private apiService: ApiService) { }
    postMsg = ''

    post() {
        this.apiService.postMessage({msg: this.postMsg})
    }
}

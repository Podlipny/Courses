import { Component } from '@angular/core'
import { ApiService } from './api.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'login',
    template: `
      <md-card>
        <md-card-header>
            <md-card-title>
                <h4>Profile</h4>
            </md-card-title>
        </md-card-header>
        <md-card-content>
            <md-list>
                <md-list-item>Name: {{profile?.name}}</md-list-item>
                <md-list-item>Email: {{profile?.email}}</md-list-item>
                <md-list-item>Description: {{profile?.description}}</md-list-item>
            </md-list>
        </md-card-content>
      </md-card>
      <md-card>
      <md-card-header>
          <md-card-title>
              <h4>Posts</h4>
          </md-card-title>
      </md-card-header>
      <md-card-content>
          <messages></messages>
      </md-card-content>
    </md-card>

  `
})
export class ProfileComponent {
    constructor(private apiService: ApiService, private route: ActivatedRoute) { }

    profile

    ngOnInit() {
        var id = this.route.snapshot.params.id
        this.apiService.getProfile(id).subscribe(data => this.profile = data)
    }
}

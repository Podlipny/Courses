import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User;
  constructor(
    private route: ActivatedRoute, // slouzi pro ziskani param z routy
    private service: UserService) { }

  ngOnInit() {
    // musime se subscribnout k route.params aby jsem pri refrash page F5 nacetly prislusneho uzivatele
    this.route.params.subscribe(params => {
      
      let id = params['id'];
      if (!id) id = 1;
      this.user = null;

      // nejdtrive nacteme users, protoze pokud refreshneme page, tak users bude prazdne
      // - vraci se local dataStore, ktery bude prazdny
      this.service.users.subscribe(users => {
        if (users.length == 0) return;

        setTimeout(() => {
          this.user = this.service.userById(id);
        }, 500);
      });

    })
  }

}

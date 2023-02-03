import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Character, CharacterService } from '../characters/character.service';
import { UserProfileService } from '../login/user-profile.service';

@Component({
  moduleId: module.id,
  selector: 'story-character',
   templateUrl: './character.component.html'
})
export class CharacterComponent implements OnInit {
  @Input() character: Character;

  private id: any;

  constructor(
    private characterService: CharacterService,
    private userProfileService: UserProfileService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (!this.character) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = +id)
        .subscribe(id => this.getCharacter());
    }
    // // force it to log outs
    // this.userProfileService.isLoggedIn = false;
    // console.log('Logged out on purpose');
  }

  private getCharacter() {
    this.characterService.getCharacter(this.id)
      .subscribe(character => this.setEditCharacter(character));
  }

  private gotoCharacters() {
    let route = ['/characters'];
    this.router.navigate(route);
  }

  private setEditCharacter(character: Character) {
    if (character) {
      this.character = character;
    } else {
      this.gotoCharacters();
    }
  }
}

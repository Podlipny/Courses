import { Component } from '@angular/core';

import { Character, CharacterService } from './character.service'; //dulezite - musime is importovat CharacterService

@Component({
  moduleId: module.id,
  selector: 'my-character-list',
   templateUrl: './character-list.component.html',
  styles: ['li {cursor: pointer;}']
})
export class CharacterListComponent {
  characters: Character[];
  messages: string[] = [];
  selectedCharacter: Character;

  constructor(private characterService: CharacterService) {
    //rekneme injectoru at injektuje CharacterService
    this.characters = this.characterService.getCharacters();
  }

  select(character: Character) {
    this.selectedCharacter = character;
  }
}


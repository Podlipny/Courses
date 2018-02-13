import { Component, OnInit } from '@angular/core';

import { MenuService } from '../services/menu.service';
import { ScreenService } from '../services/screen.service';

@Component({
  selector: 'fw-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private menuService: MenuService,
              private screenService: ScreenService) { }

  ngOnInit() {
  }

}

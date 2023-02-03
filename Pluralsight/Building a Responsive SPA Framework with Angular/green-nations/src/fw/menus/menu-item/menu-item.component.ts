import { Component, ElementRef, HostBinding, HostListener,
         Input, OnInit, Renderer,
         trigger, state, style, transition, animate } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { MenuItem, MenuService } from '../../services/menu.service';

@Component({
  selector: 'fw-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
        trigger('visibilityChanged', [
            transition(':enter', [   // :enter is alias to 'void => *' element jeste neni v DOM
                style({opacity:0}),
                animate(250, style({opacity:1})) 
            ]),
            transition(':leave', [   // :leave is alias to '* => void' element mizi z DOM
                animate(100, style({opacity:0})) 
            ])
        ])
    ]
})
export class MenuItemComponent implements OnInit {
  // see angular-cli issue #2034 - je to kvuli tomu, ze je v angularu bug, ktery pokud neni interface v samostatnem souboru, tak dojde k warningu
  @Input() item = <MenuItem>null;
  // pokud je parent popup (parentIsPopup = true), tak pridame tuhle class @HostBinding('class.parent-is-popup')
  // defaultne je na true, ale pokud vytvarime root menu itemy, tak nastavujeme na false
  // jedna se hlavne o popup v popupu
  @HostBinding('class.parent-is-popup')
  @Input() parentIsPopup = true; 
  isActiveRoute = false;

  mouseInItem = false;
  mouseInPopup = false;
  popupLeft = 0;
  popupTop = 34;

  constructor(private router:Router, 
              private menuService: MenuService,
              private el: ElementRef,
              private renderer: Renderer) {
  }

  checkActiveRoute(route: string) {
    // rika nam ze jsme na aktivni route a ma obarvit element
    this.isActiveRoute = (route == '/' + this.item.route);
  }

  ngOnInit() : void {
    // je to v init, protoze v constructoru jeste nemame pristup k properties
    this.checkActiveRoute(this.router.url);

    //pokud se routa zmeni, musime zjisit zda se jedna o active route
    this.router.events
        .subscribe((event) => {
            // pokud je event typu NavigationEnd, tak overime, ze jsme na spravne route
            if (event instanceof NavigationEnd) {
                this.checkActiveRoute(event.url);
                //console.log(event.url + ' ' + this.item.route + ' ' + this.isActiveRoute);
            }
        });
  }

  // HostListener posloucha eventy na dane componnete
  // takto reseny click je tu z toho duvodu, ze pokud se jedna o submenu, tak chceme rozbalit popup pokud jde o vertical menu
  @HostListener('click', ['$event'])
  onClick(event) : void {

    event.stopPropagation(); // event nebude poslan parent elementum

    if (this.item.submenu) {
      if (this.menuService.isVertical) {
          this.mouseInPopup = !this.mouseInPopup; //pro vertikalni menu otevreme popup
      }
    }
    else if (this.item.route) {
      // pokud se jedna o horizontalni menu muisme vytvorit event mouseleave and invoke it
      // force horizontal menus to close by sending a mouseleave event
      let newEvent = new MouseEvent('mouseleave', {bubbles: true});
      this.renderer.invokeElementMethod(
          this.el.nativeElement, 'dispatchEvent', [newEvent]);

      this.router.navigate(['/' + this.item.route]);
        
    }
  }

  onPopupMouseEnter(event) : void {
      if (!this.menuService.isVertical) {
          this.mouseInPopup = true;
      }
  }

  onPopupMouseLeave(event) : void {
      if (!this.menuService.isVertical) {
          this.mouseInPopup = false;
      }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event) : void {
      if (!this.menuService.isVertical) {
          this.mouseInItem = false;
      }
  }

  @HostListener('mouseenter') 
  onMouseEnter() : void {
      if (!this.menuService.isVertical) {
          if (this.item.submenu) {
              this.mouseInItem = true;
              if (this.parentIsPopup) {
                  this.popupLeft = 160;
                  this.popupTop = 0;
              }
          }
      }
  }
}
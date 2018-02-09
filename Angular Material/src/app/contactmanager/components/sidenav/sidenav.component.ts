import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // soucast typescriptu - hlida a porovnavame zda pri zmene velikosti window (prohlizece) dojde ke zmene width
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  constructor(zone: NgZone,  private userService: UserService, private router: Router) {
    //NgZone je tu kvuli change detection - pokud by tu nebylo listener nebude vedet ze se neco zmenilo
    
    // pokud dojde ke zmene mediaMatcheru ((max-width: 720px)), tak dojde k updatu
    // pokud by jsme se nesubscribly, tak musime po zmene velikosti porhlizece refreshnout stranku
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
  }

  // pristupujeme v sidenav componente, ktera je umistena v template
  // musime mit referenci v html #sidenav
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    this.sidenav.toggle().then(() => this.sidenav.toggle());
  }

  ngOnInit() {
    // predame si referenci na users a k te se subscribneme (v tomto pripade to bude v template pomoci pipeline async)
    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      //pokazde kdyz nekdo klikne na uzivatele (prenacte se routa) tak chceme zavrit side nav
      if (this.isScreenSmall())
        this.sidenav.close();
    })
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}

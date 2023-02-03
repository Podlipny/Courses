import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

import { ScreenService } from '../services/screen.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({selector: '[screenLarge]'}) //[] znamena ze pouzijeme jako attribut
export class ScreenLarge implements OnDestroy {
  private hasView = false;
  private screenSubscription: Subscription;

  //* nam dava templatu z elementu na kterem je directiva pouzita
  constructor(private viewContainer: ViewContainerRef, 
                private template: TemplateRef<Object>, 
                private screenService: ScreenService) {

    this.screenSubscription = screenService.resize$.subscribe(() => this.onResize());

  }

  @Input()
  set screenLarge(condition) {
    // ignore the passed condition and set it based on screen size
    condition = this.screenService.screenWidth >= this.screenService.largeBreakpoint;
    
    if (condition && !this.hasView) {
      //hasView nam rika, ze uz jsme vytvorily view
      this.hasView = true;
      // viewContainer odkazuje na element na ktere je directiva pouzita a createEmbeddedView ji pirda do DOM
      this.viewContainer.createEmbeddedView(this.template); 
    } else if (!condition && this.hasView) {
      this.hasView = false;
      this.viewContainer.clear();
    }
  }

  // musime se postarat o unsubscribe pri zruseni DOM elementu
  ngOnDestroy() {
    this.screenSubscription.unsubscribe();
  }
  
  onResize() {
    // trigger the setter
    this.screenLarge = false; // sllouzi pouze ke spusteni setteru
  }
}

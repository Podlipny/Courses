import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';
//An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. 
//While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.

export interface SpinnerState {
  show: boolean;
}

@Injectable()
export class SpinnerService {
  private spinnerSubject = new Subject<SpinnerState>();

  spinnerState = this.spinnerSubject.asObservable();

  constructor(@Optional() @SkipSelf() prior: SpinnerService) {
    if (prior) { return prior; }
    console.log("created spinner service")
  }

  show() {
    this.spinnerSubject.next(<SpinnerState>{ show: true }); //pomoci next posleme do Subject observable objektu novou value
  }

  hide() {
    this.spinnerSubject.next(<SpinnerState>{ show: false });
  }
}

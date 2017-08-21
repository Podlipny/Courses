import {bootstrap}    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx'; // get everything from Rx

import { AppComponent } from './app.component';

bootstrap(AppComponent, [
  HTTP_PROVIDERS
]);

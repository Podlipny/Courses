import { Component } from '@angular/core';

// import { CustomerService } from './customer/customer.service';
// import { CustomersComponent } from './customer/customers.component';

// here is my barrel // future i would just import './customer'
import { CustomersComponent, CustomerService } from './customer/index';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  directives: [CustomersComponent],--
  providers: [CustomerService] //rikame ze chceme instancy CustomerService - pro potomky se chova jako Singletone, pokud implementujeme i v nich vytvarime novou instanci
})
export class AppComponent {
  // [ ] means property binding - C to D
  // ( ) means event binding - D to C
  title = 'Customer App';
  name = 'Ward';
  wardsColor = 'green';

  changeSuitColor() {
    this.wardsColor = this.wardsColor === 'green' ? 'red' : 'green';
  }
}

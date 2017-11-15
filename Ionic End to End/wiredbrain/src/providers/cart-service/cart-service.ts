import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

/*
  Generated class for the CartServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartServiceProvider {

  theCart: any[] = [];

  constructor() {}

  getCart(){
    return Promise.resolve(this.theCart);
  }

  
  addItem(myItem){
    this.theCart.push(myItem);
  }

  removeItem(id, price){
    let tmpId = `${id}-${price}`;
    let tmp = this.theCart.map(x => x.orderId).indexOf(tmpId);

    if (tmp > -1) {
      this.theCart.splice(tmp, 1);
    }
  
  }

  emptyCart(){
    this.theCart = [];
  }



}

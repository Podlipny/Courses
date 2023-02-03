import { Component } from "@angular/core";
import { DataService } from "../shared/dataService";
import { Router } from "@angular/router";

@Component({
  selector: "the-cart",
  templateUrl: "cart.component.html",
  styleUrls: []
})
export class Cart {

  constructor(public data: DataService, private router: Router) { }

  onCheckout() {
    if (this.data.loginRequired) {
      // Force Login
      this.router.navigate(["login"]);
    } else {
      // Go to checkout
      this.router.navigate(["checkout"]);
    }
  }
}
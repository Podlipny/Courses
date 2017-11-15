import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuServiceProvider } from '../../providers/menu-service/menu-service';

import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the MenuDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-detail',
  templateUrl: 'menu-detail.html',
})
export class MenuDetailPage implements OnInit {

  theCoffee = {
    id:'',
    name:'',
    description:'',
    img:'',
    small:0,
    medium:0,
    large:0,
    size:'',
    price:0,
    milk:'no',
    whip:'no',
    orderId:''
  };
  



  constructor(public navCtrl: NavController, public navParams: NavParams, public menuList: MenuServiceProvider, 
              public cartSvc: CartServiceProvider, public userService: UserServiceProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuDetailPage');
  }
  ngOnInit(){
    let id = this.navParams.get('id');
    this.menuList.getOne(id)
    .then(ret => this.initObject(ret));
  }
  initObject(myData){
    this.theCoffee.id = myData.id;
    this.theCoffee.name = myData.name;
    this.theCoffee.description = myData.description;
    this.theCoffee.img = myData.img;
    this.theCoffee.small = myData.small;
    this.theCoffee.medium = myData.medium;
    this.theCoffee.large = myData.large;
    this.theCoffee.price = myData.small;
  }

  addToCart(){
    
    if(this.userService.success) {
      
      if(this.theCoffee.price == this.theCoffee.small) {
        this.theCoffee.size = 'small';
      }

      else if(this.theCoffee.price == this.theCoffee.medium){
        this.theCoffee.size = 'medium';
      }
    
      else {
        this.theCoffee.size = 'large';
      }
      this.theCoffee.price = Number(this.theCoffee.price);
      this.theCoffee.orderId = `${this.theCoffee.id}-${this.theCoffee.price}`;
      this.cartSvc.addItem(this.theCoffee);
      this.userService.displayAlert(`${this.theCoffee.size} ${this.theCoffee.name}`, 'Added to cart');
    
    }
    else{
      this.userService.displayAlert('Cannot Add', 'You need to register an account first');
    }
  }
  
}

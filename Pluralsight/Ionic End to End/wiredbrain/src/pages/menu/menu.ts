import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuServiceProvider } from '../../providers/menu-service/menu-service';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {

  myCoffee: any[] = [];

  detailPage: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public menuList: MenuServiceProvider) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  ngOnInit(){
    this.detailPage = 'MenuDetailPage';
    this.grabMenu();
  }
  grabMenu(){
    this.menuList.getCafeDB()
      .then(coffee => this.myCoffee = coffee);
     
  }
  chooseCafe(id){
    this.navCtrl.push(this.detailPage, {
      id: id
    });
  }

}

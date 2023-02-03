import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RewardModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reward-modal',
  templateUrl: 'reward-modal.html',
})
export class RewardModalPage {

  displayParam: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public viewCtrl: ViewController) {
    this.displayParam = navParams.get('rewardParam');
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardModalPage');
  }
  dismiss() {
    //dismissneme Modul
    this.viewCtrl.dismiss();
  }

}

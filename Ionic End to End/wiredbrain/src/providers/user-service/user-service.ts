import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { RewardServiceProvider } from '../reward-service/reward-service';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  items: FirebaseListObservable<any>;

  success:boolean;

  user: string;
  
 

  constructor(private afAuth: AngularFireAuth, public alertCtrl: AlertController,
              private storage: Storage,  private fbDb: AngularFireDatabase,
              private reward: RewardServiceProvider) {
    
    this.items = fbDb.list('/users') //reference na firebase tabulku
                
  }

  displayAlert(alertTitle, alertSub){
    let theAlert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ['OK']
    });
    theAlert.present();
  }

  logOut(){
    //this.storageControl('delete');
    this.afAuth.auth.signOut()
      .then(loggedOut => {
        this.displayAlert('Logged out', 'Come back and visit soon')
        this.success = false;
      })
      .catch(err => this.displayAlert('Error logging out',err));
  }


  //vlastni akce pro save storage - muzeme zobrazovat nase messages
  storageControl(action, key?,value?) {
    if (action == 'set'){
      return this.storage.set(key, value);
    }
    if (action == 'get'){
      return this.storage.get(key);
    }
    if (action == 'delete'){
      if (!key) {
        this.displayAlert('Warning','About to delete all user data');
        return this.storage.clear();
      }
      else {
        this.displayAlert( key,'Deleting this users data');
        return this.storage.remove(key);
      }
    }

  }

  saveNewUser(user){
    let userObj = {
      creation: new Date().toDateString(),
      logins: 1,
      rewardCount: 0,
      lastLogin: new Date().toLocaleString(),
      id: ''
    }
    //firebase push - ulozeni dat do DB
    this.items.push({
      username: user,
      creation: userObj.creation,
      logins: userObj.logins,
      rewardCount: userObj.rewardCount,
      lastLogin: userObj.lastLogin
    })
    .then(res => {
      userObj.id = res.key;
      return this.storageControl('set', user, userObj ); //ulozeni usera do storage
    });
    
    //vratime uklozeneho usera
    return this.storageControl('get', user);
    
  }

  updateUser(theUser,theUserData){
    let newData = {
      creation: theUserData.creation,
      logins: theUserData.logins,
      rewardCount: theUserData.rewardCount,
      lastLogin: new Date().toLocaleString(),
      id: theUserData.id
    }
    this.items.update(newData.id,{
      logins: newData.logins,
      rewardCount: newData.rewardCount,
      lastLogin: newData.lastLogin
    });
    return this.storageControl('set', theUser, newData ); //prepiseme usera
  }

  logOn(user, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(user,password)
      .then(result => {
        this.storageControl('get',user)
          .then( returned => {
            if (!returned) {
              this.saveNewUser(user)
              .then(res => this.displayAlert(user,'New account saved for this user'));    
            }
            else{
              this.reward.rewardsCheck( user, returned )
              .then( rewardResult => {    
                
                this.updateUser(user, rewardResult)
                .then(updated => console.log(user ,updated))
              
              })
            }
          })

          this.success = true;
          return result;
      })
      .catch(err => {
        this.success = false;
        this.displayAlert('Error logging in',err)
        return err;
      });
  }

  returnUser(){
    return Promise.resolve(this.user);
  }

}


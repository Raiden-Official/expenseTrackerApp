import { WelcomePage } from './../welcome/welcome';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SignupPage } from '../signup/signup';
import CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authForm: FormGroup;
  nav: NavController;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public menuCtrl: MenuController, public storage: Storage, public events: Events) {
    this.nav = navCtrl;
    this.menuCtrl.enable(false, 'myMenu');
    this.authForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9@.]*'), Validators.minLength(8), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit(value: any): void {
    if(this.authForm.valid) {
      var username = CryptoJS.SHA1(value.username);
      var password = CryptoJS.SHA1(value.password);

      var fetchUsers = this.storage.get('usersList');
      fetchUsers.then(function(users){
        for(let i in users){
          if(username == users[i].userID && password == users[i].pass){
            this.storage.set('password', String(password));
            this.storage.set('currentUserId', String(username));
            let uName = users.filter(users => users.userID == username);
            this.events.publish('updateUser', uName[0].name);
            this.nav.setRoot(WelcomePage);
            break;
          }
          else if(Number(i)+1 == users.length){
            alert('User credentials are wrong, try again.');
          }
        }
      }.bind(this));

    }
  }

  pushSignUp(){
    this.nav.push(SignupPage);
  }

}

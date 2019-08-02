
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import CryptoJS from 'crypto-js';
import { UserInfoPage } from '../user-info/user-info';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;
  nav: NavController;
  username: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private storage: Storage) {
    this.nav = navCtrl;
    this.signupForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*@[a-zA-Z]*.[a-z]*'), Validators.minLength(8), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  onSubmit(value: any): void{

    if(this.signupForm.valid){
      this.storage.get('usersList').then((usersList)=>{

        if(usersList== null || Number(usersList.filter(user => user.userID == String(CryptoJS.SHA1(value.username))).length) == 0){
          this.storage.set('currentUserId', String(CryptoJS.SHA1(value.username)));
          this.storage.set('password', String(CryptoJS.SHA1(value.password)));
          this.signupForm.reset();
          this.nav.setRoot(UserInfoPage);
        }
        else{
          alert("Username already exists, try loggin in.");
        }
      });
    }

  }

  pushLogin(){
    this.nav.setRoot(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
;

import { WelcomePage } from './../welcome/welcome';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UpdateWelcomePageProvider } from '../../providers/update-welcome-page/update-welcome-page';
/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  nav: any;
  userInfoForm: FormGroup;

  currentUserName: any;
  currentUserSalary: any;
  currentSavingsPercentage: any;

  promise1 = this.storage.get('currentUserId');
  promise2 = this.storage.get('password');
  promise3 = this.storage.get('usersList');

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private storage:  Storage, private updateWelcomePage: UpdateWelcomePageProvider, public events: Events) {
    this.nav = navCtrl;
    console.log('user Info page constructor');
    this.currentUserName = updateWelcomePage.userName;
    this.currentUserSalary = updateWelcomePage.salary;
    this.currentSavingsPercentage = updateWelcomePage.savings;
    this.userInfoForm = formBuilder.group({
      userName: [this.currentUserName, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z.!@#$%^&* 0-9]*'), Validators.maxLength(30)])],
      userSalary: [this.currentUserSalary, Validators.compose([Validators.required])],
      isUserSalaryFix: [false, Validators.compose([Validators.required])],
      userSavings: [this.currentSavingsPercentage, Validators.compose([Validators.max(100)])]
    });
  }

  addUserData(value: any): void{
    let pocket = Number(value.userSalary);
    let savings = Number(value.userSalary);
    pocket = pocket - (Number(value.userSavings)*pocket/100);
    savings = savings - pocket;

    Promise.all([this.promise1, this.promise2, this.promise3]).then(function(values){
      let users = [];
      let user = {name: value.userName, salary: value.userSalary, pocket: pocket, savings: savings, userID: values[0], pass: values[1]};
      users = values[2] || [];
      users.push(user);
      this.events.publish('updateUser', value.userName);
      //Resolve 'this' in this scope.
      this.nav.setRoot(WelcomePage);
      this.storage.set('usersList', users);
    }.bind(this));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }
}

import { UpdateWelcomePageProvider } from './../../providers/update-welcome-page/update-welcome-page';
import { LoginPage } from './../login/login';
import { AddMoneyPage } from './../add-money/add-money';
import { ExpenseListPage } from './../expense-list/expense-list';
import { ExpenseFormPage } from './../expense-form/expense-form';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  nav: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public updateWelcomePage: UpdateWelcomePageProvider) {
    this.nav = navCtrl;
    this.menuCtrl.enable(true, 'myMenu');
    updateWelcomePage.updateVariables();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');

  }

  pushForm(){
    this.nav.setRoot(ExpenseFormPage);
  }
  pushAddMoneyForm(){
    this.nav.setRoot(AddMoneyPage);
  }
}

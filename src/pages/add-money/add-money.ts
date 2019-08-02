import { WelcomePage } from './../welcome/welcome';
import { UpdateWelcomePageProvider } from './../../providers/update-welcome-page/update-welcome-page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'
/**
 * Generated class for the AddMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-money',
  templateUrl: 'add-money.html',
})
export class AddMoneyPage {
  addMoneyForm: FormGroup;
  nav: any;
  pocket : any;
  saving : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private storage:Storage, private updateWelcomePage: UpdateWelcomePageProvider) {
    this.nav = navCtrl;
    this.pocket = updateWelcomePage.pocket;
    this.saving = updateWelcomePage.savings;
    this.addMoneyForm = formBuilder.group({
      bonusMoney: ['', Validators.compose([Validators.required, Validators.min(1)])],
      bonusSavingPercent: ['', Validators.compose([Validators.max(100), Validators.min(0)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMoneyPage');
  }

  addMoney(value:any){
    if(this.addMoneyForm.valid){
      this.saving = this.saving + Number(value.bonusMoney)*Number(value.bonusSavingPercent)/100;
      this.pocket = this.pocket + Number(value.bonusMoney) - this.saving;
      this.updateWelcomePage.updateUserPocket(this.pocket, this.saving);
      this.nav.setRoot(WelcomePage);
    }
  }
}

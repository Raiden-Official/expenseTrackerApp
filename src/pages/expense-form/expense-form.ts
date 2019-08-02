import { UpdateWelcomePageProvider } from './../../providers/update-welcome-page/update-welcome-page';
import { WelcomePage } from './../welcome/welcome';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';


/**
 * Generated class for the ExpenseFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-form',
  templateUrl: 'expense-form.html',
})
export class ExpenseFormPage{
  expenseForm: FormGroup;
  nav: NavController;
  now: any;
  pocket: any;
  saving: any;
  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private localNotifications: LocalNotifications, private updateWelcomePage: UpdateWelcomePageProvider) {
    this.nav = navCtrl;
    this.now = moment().format('YYYY-MM-DDTHH:mm');
    this.pocket = updateWelcomePage.pocket;
    this.saving = updateWelcomePage.savings;
    this.expenseForm = formBuilder.group({
      expenseName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z1-9 ]*'), Validators.maxLength(20)])],
      expenseCost: ['', Validators.compose([Validators.required, Validators.max(this.pocket)])],
      expenseType: [false, Validators.compose([Validators.required])],
      tagLocation: [false, Validators.compose([Validators.required])],
      expenseTime: [''],
      expenseDate: [''],
      expenseData: [''],
      expensePeriod: ['Monthly'],
      category: ['Food  ']
    });
  }



  onSubmit(value: any): void{
    var oldData = this.updateWelcomePage.expenseList || [];
    var expenseTypeValue: any;
    //update local variables
    if(value.expenseType)
      expenseTypeValue = value.expensePeriod;
    else
      expenseTypeValue  = value.expenseType;
    var newExpense = {name: value.expenseName, cost: value.expenseCost, type: expenseTypeValue, location: value.tagLocation, time: moment(value.expenseTime).local().format('HH:mm'), date: moment(value.expenseDate).format('YYYY-MM-DD'), userID: this.updateWelcomePage.currentUser,category: value.category};
    this.pocket = this.pocket - Number(value.expenseCost);
    this.updateWelcomePage.updateUserPocket(this.pocket, this.saving);

    //sort expense in the expenseList
    if(Number(oldData.length)==0){
      oldData.push(newExpense);
      console.log("List was empty.");
    }
    else if(oldData[Number(oldData.length)-1].date < newExpense.date){
      oldData.push(newExpense);
      var i = Number(oldData.length)-1;
      // oldData[i] has newExpense
      console.log(oldData[i].date);
      while(i>0 && oldData[i-1].date < oldData[i].date ){
        oldData[i] = oldData[i-1];
        oldData[i-1] = newExpense;
        i-=1;
      }

    }
    else
    {
      oldData.push(newExpense);
      console.log("Else condition.");
    }

    //set into storage
    this.storage.set('expenseList', oldData).then(function(){
      console.log('New value set');
      if(newExpense.type == 'Monthly'){
        this.setNotification(newExpense);
      }
      this.nav.setRoot(WelcomePage);
    }.bind(this));
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseFormPage');
  }
  setNotification(formInput): void{
    console.log("Setting notification schedule");
    let time = formInput.time.split(':');

    console.log(time);
    let alarmDate = new Date(formInput.date);
    let notification: any = {
        id:0,
        text: 'One Time Notification',
        at: new Date(alarmDate.getFullYear(), alarmDate.getMonth(), alarmDate.getDate(), time[0], time[1]),
        led: 'FF0000',
     }
     this.localNotifications.schedule(notification);
     this.localNotifications.isScheduled(0);
     alert("Notification will pop at the given time.");
  }
}

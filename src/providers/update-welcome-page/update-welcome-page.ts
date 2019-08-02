
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
/*
  Generated class for the UpdateWelcomePageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UpdateWelcomePageProvider {
  salary : any;
  monthExpense : any;
  pocket : any;
  savings : any;
  currentUser :any;
  password: any;
  expenseList = [];
  userName: any;
  totals:number[] = [0,0,0,0,0];
  savingsPer: any;

  constructor(private storage: Storage) {
    console.log('Hello UpdateWelcomePageProvider Provider');
    this.updateVariables();
  }
  updateVariables(){
    var fetchUsersList = this.storage.get('usersList');
    var fetchCurrentUser = this.storage.get('currentUserId');
    var fetchCurrentPass = this.storage.get('password');
    //add expenselist here
    var fetchExpenseList = this.storage.get('expenseList');

    Promise.all([fetchUsersList, fetchCurrentUser, fetchCurrentPass, fetchExpenseList]).then(function(userCredentials){
      let userList = userCredentials[0];
      this.currentUser = userCredentials[1];
      this.password = userCredentials[2];
      let expenseList = userCredentials[3];
      this.monthExpense = 0;
      if(expenseList != null){
        expenseList = expenseList.filter(expense => expense.userID == this.currentUser);
        for (let expen of expenseList){
          this.monthExpense = this.monthExpense + Number(expen.cost);
        }
      }
      for(let i in userList){
        if(userList[i].userID == userCredentials[1]){
          this.salary = userList[i].salary;
          this.pocket = userList[i].pocket;
          this.savings = userList[i].savings;
          this.userName = userList[i].name;
        }
      }
      //this.savingsPer = Number(this.savings) * 100 / Number(this.salary);
    }.bind(this));
  }



  updateUserPocket(newPocket, newSaving){
    this.storage.get('usersList').then(function(list){
      for(let i in list){
        if(list[i].userID == this.currentUser){
          let exp = list[i].pocket - newPocket;
          list[i].pocket = newPocket;
          list[i].savings = newSaving;
          this.monthExpense = this.monthExpense + exp;
        }
      }
      this.storage.set('usersList', list).then(function(){
        this.updateVariables();
      }.bind(this));
    }.bind(this));

  }
}

import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UpdateWelcomePageProvider } from '../../providers/update-welcome-page/update-welcome-page';
import * as HighCharts from 'highcharts';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ExpenseListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-list',
  templateUrl: 'expense-list.html',
})

export class ExpenseListPage {
  currentUserExpenseList = [];
  viewCtrller : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private updateWelcomePage: UpdateWelcomePageProvider, public viewCtrl: ViewController) {
    this.currentUserExpenseList = [];
    this.setChartVariables();
  }

  setChartVariables(){
    this.storage.get('expenseList').then((value)=>{
      if(value != null){
      value = value.filter(x=>x.userID == this.updateWelcomePage.currentUser);
      this.updateWelcomePage.totals = [0,0,0,0,0];
      this.currentUserExpenseList = value;
      for(let i in value){
        switch(value[i].category){
          case 'Food':
            this.updateWelcomePage.totals[0] += Number(value[i].cost);
            break;
          case 'Appearl':
            this.updateWelcomePage.totals[1] += Number(value[i].cost);
            break;
          case 'Travel':
            this.updateWelcomePage.totals[2] += Number(value[i].cost);
            break;
          case 'Electronics':
            this.updateWelcomePage.totals[3] += Number(value[i].cost);
            break;
          case 'Grocery':
            this.updateWelcomePage.totals[4] += Number(value[i].cost);
            break;
        }
      }
      }
      else {
        this.currentUserExpenseList = [];
      }
    });
  }


  ionViewDidEnter(){
    console.log(this.currentUserExpenseList);
    if(this.currentUserExpenseList.length != 0){
    var myChart = HighCharts.chart('container', {
      chart: {
      type: 'pie'
      },
      title: {
      text: 'Expense'
      },

      series: [{
        name: 'Expense',
        data:[
        {
          name: "Food",
          y: this.updateWelcomePage.totals[0],
          drilldown: "Food",
        },
        {
          name:'Appearl',
          y: this.updateWelcomePage.totals[1],
          drilldown: 'Appearl',
        },
        {
          name:'Travel',
          y: this.updateWelcomePage.totals[2],
          drilldown: 'Travel',
        },
        {
          name:'Electronics',
          y: this.updateWelcomePage.totals[3],
          drilldown: 'Electronics',
        },
        {
          name:'Grocery',
          y: this.updateWelcomePage.totals[4],
          drilldown: 'Grocery',
        }
      ]
      }]
      });
      //myChart.redraw;
    }
  }

  ionViewDidLoad() {
  }
}

/* eslint-disable guard-for-in */
import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { DateService } from 'src/app/shared/service/date.service';
import { ExpenseService } from '../../service/expense.service';
import { IonLoaderService } from '../../service/ion-loader.service';
import { CashflowService } from '../cashflow.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  expenselist ={};
  incomelist ={};
  totalIncome = 0;
  totalExpense = 0;
  showIncomeDetails = false;
  showExpenseDetails = true;
  keyDescOrder: any;

  constructor(private expenseService: ExpenseService,
              private authService: AuthenticationService,
              private dateService: DateService,
              private ionLoaderService: IonLoaderService) { }


  ngOnInit() {
    // eslint-disable-next-line max-len
    this.ionLoaderService.simpleLoader();
    this.keyDescOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number =>
        a.value > b.value ? -1 : (b.value > a.value ? 1 : 0);
    const currentUser= this.authService.userId;
    const currentYear = this.dateService.currentYear;
    const currentMonth = this.dateService.currentMonth;
    this.expenseService.getGroupedData('expense', currentYear, currentMonth, 'prayag')
      .subscribe(e =>{
        this.expenselist = e.data();
        for (const key in this.expenselist) {
          const value = this.expenselist[key];
          this.totalExpense = this.totalExpense + value;
        }
      });

      this.expenseService.getGroupedData('income', currentYear, currentMonth, 'prayag')
      .subscribe(e =>{
        this.incomelist = e.data();
        for (const key in this.incomelist) {
          const value = this.incomelist[key];
          this.totalIncome = this.totalIncome + value;
      }
      this.ionLoaderService.dismissLoader();
      });

  }

  toggleIncomeDetails(){
    this.showIncomeDetails = ! this.showIncomeDetails;
  }

  toggleExpenseDetails(){
    this.showExpenseDetails = ! this.showExpenseDetails;
  }

}

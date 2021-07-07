import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/shared/Constants';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { DateService } from 'src/app/shared/service/date.service';
import { CashflowService } from '../cashflow.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  transactionList = [];
  allMonths =[] ;
  allYears = [];
  currentMonth: string;
  currentYear: string;
  currentUser: string;

  constructor(private cashflowService: CashflowService,
              private authService: AuthenticationService,
              private dateService: DateService) { }

  ngOnInit() {
    this.currentUser = this.authService.userId;
    this.allMonths = this.dateService.allMonths;
    this.allYears = this.dateService.allYears;
    this.currentMonth = this.dateService.currentMonth;
    this.currentYear = this.dateService.currentYear;

    this.cashflowService.getExpenses(this.currentUser,this.currentYear,this.currentMonth)
        .subscribe(data => {
          this.transactionList = data.map(e => ({
              amount: e.payload.doc.data()[constants.amount],
              category: e.payload.doc.data()[constants.category],
              type: e.payload.doc.data()[constants.type],
              transactionDate: e.payload.doc.data()[constants.transactionDate]
            }));
        });
  }

}

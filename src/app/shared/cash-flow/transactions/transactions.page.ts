import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { constants } from 'src/app/shared/Constants';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { DateService } from 'src/app/shared/service/date.service';
import { ExpenseService } from '../../service/expense.service';
import { IonLoaderService } from '../../service/ion-loader.service';
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
  familyId: string;

  constructor(private expenseService: ExpenseService,
              private authService: AuthenticationService,
              private dateService: DateService,
              private ionLoaderService: IonLoaderService,
              private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.familyId = params.get('id');
  });
    this.ionLoaderService.simpleLoader();
    this.currentUser = this.authService.userId;
    this.allMonths = this.dateService.allMonths;
    this.allYears = this.dateService.allYears;
    this.currentMonth = this.dateService.currentMonth;
    this.currentYear = this.dateService.currentYear;

    this.expenseService.getExpenses(this.currentYear,this.currentMonth,this.familyId)
        .subscribe(data => {
          this.transactionList = data.map(e => ({
              amount: e.payload.doc.data()[constants.amount],
              category: e.payload.doc.data()[constants.category],
              type: e.payload.doc.data()[constants.type],
              transactionDate: e.payload.doc.data()[constants.transactionDate]
            }));
            this.ionLoaderService.dismissLoader();
        });
  }

}

import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/shared/Constants';
import { CashflowService } from '../cashflow.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  transactionList = [];
  constructor(private cashflowService: CashflowService) { }

  ngOnInit() {
    this.cashflowService.getExpenses().subscribe(data => {
      this.transactionList = data.map(e => ({
          amount: e.payload.doc.data()[constants.amount],
          category: e.payload.doc.data()[constants.category],
          type: e.payload.doc.data()[constants.type],
          transactionDate: e.payload.doc.data()[constants.transactionDate]
        }));
    });
  }

}

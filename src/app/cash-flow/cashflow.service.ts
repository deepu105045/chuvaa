import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '../shared/Transaction';
import firebase from 'firebase/app';
import { DateService } from '../shared/service/date.service';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class CashflowService {
  collectionName = 'cashflow';
  expenseRef: any;
  transaction = 'transactions';

  constructor(private firestore: AngularFirestore, private dateService: DateService) { }

  getExpenses(currentUser, currentYear, currentMonth){
    const monthRef = this.getMonthCollection(currentUser, currentYear, currentMonth);
    return monthRef.collection(this.transaction,ref => ref.orderBy('transactionDate', 'desc'))
                   .snapshotChanges();
  }

  addExpense(transaction: Transaction){
    const currentUser = transaction.userId;
    const transactionDate = transaction.transactionDate;
    const newDate = new Date(transactionDate);
    const currentYear = newDate.getFullYear();
    const currentMonth = this.dateService.formatMonth(newDate);

    const monthRef = this.getMonthCollection(currentUser, currentYear, currentMonth);
    return monthRef.collection(this.transaction).add(transaction);

  }

  getFirebaseTimeStamp(){
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  private getMonthCollection(currentUser: string, currentYear: number, currentMonth: string) {
    return this.firestore
      .collection(this.collectionName)
      .doc(currentUser)
      .collection(currentYear.toString())
      .doc(currentMonth.toString());
  }



}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '../shared/Transaction';

@Injectable({
  providedIn: 'root'
})
export class CashflowService {
  collectionName = 'expense';

  constructor(private firestore: AngularFirestore) { }

  getExpenses() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  addExpense(transaction: Transaction){
    return this.firestore.collection(this.collectionName).add(transaction);
  }



}

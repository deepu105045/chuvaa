import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '../Transaction';
import firebase from 'firebase/app';
import { DateService } from '../service/date.service';
import { AuthenticationService } from '../service/authentication.service';
import { constants } from '../Constants';

@Injectable({
  providedIn: 'root'
})
export class CashflowService {
  collectionName = 'cashflow';
  usersCollection = 'users';
  transaction = 'transactions';
  groupedCollection ='grouped';
  total = 'total';
  totalIncome: any;
  totalExpense: any;

  constructor(private firestore: AngularFirestore, private dateService: DateService,
              private authService: AuthenticationService) { }

  getExpenses(currentUser, currentYear, currentMonth, origin){
    const monthRef = this.getMonthCollection(currentUser, currentYear, currentMonth, origin );
    return monthRef.collection(this.transaction,ref => ref.orderBy('transactionDate', 'desc'))
                   .snapshotChanges();
  }
  getGroupedData(document,currentUser, currentYear, currentMonth , origin){
    const monthRef = this.getMonthCollection(currentUser, currentYear, currentMonth, origin );
    return monthRef.collection(this.groupedCollection).doc(document).get();
  }

  addExpense(transaction: Transaction){
    const currentUser = transaction.userId;
    const transactionDate = transaction.transactionDate;
    const newDate = new Date(transactionDate);
    const currentYear = newDate.getFullYear();
    const currentMonth = this.dateService.formatMonth(newDate);
    const origin = transaction.origin;

    const monthRef = this.getMonthCollection(currentUser, currentYear, currentMonth,origin);
    return monthRef.collection(this.transaction).add(transaction).then(res =>{
            console.log(res);
            this.addGroupedData(transaction);
          }).catch(error =>{
            console.log('Error saving data ' + error);
          });
  }

  addGroupedData(transaction: Transaction){
    const currentUser = transaction.userId;
    const transactionDate = transaction.transactionDate;
    const newDate = new Date(transactionDate);
    const currentYear = newDate.getFullYear();
    const currentMonth = this.dateService.formatMonth(newDate);
    const origin = transaction.origin;
    const monthRef = this.getMonthCollection(currentUser, currentYear, currentMonth,origin);
    return monthRef.collection(this.groupedCollection).doc(transaction.type).get().subscribe(e =>{
        const resp = e.data();
        if(typeof resp !== 'undefined'){
          const amount: number = resp[transaction.category] ?resp[transaction.category] :0;
          const newAmount = amount + transaction.amount;
          const category =transaction.category;
          const obj = {[category]: newAmount};
          monthRef.collection(this.groupedCollection).doc(transaction.type).update(obj);
        }else{
          const category =transaction.category;
          const newAmount =transaction.amount;
          const obj = {[category]: newAmount};
          monthRef.collection(this.groupedCollection).doc(transaction.type).set(obj);
        }
      });
  }


  getFirebaseTimeStamp(){
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getHomeDetails(){
    const currentUserId = this.authService.userId;
    const userRef = this.firestore.collection(this.usersCollection).doc(currentUserId);
    return userRef.valueChanges();
 }

  private getMonthCollection(currentUser: string, currentYear: number, currentMonth: string, origin: string) {
    return this.firestore
      .collection(this.collectionName)
      .doc(currentUser+ '-' + origin)
      .collection(currentYear.toString())
      .doc(currentMonth.toString());
  }




}

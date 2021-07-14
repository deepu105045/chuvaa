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
export class ExpenseService {
  transaction = 'transactions';
  collectionName = 'family-cashflow';
  groupedCollection ='grouped';

  constructor(private firestore: AngularFirestore, private dateService: DateService,
    private authService: AuthenticationService) { }

    addExpense(transaction: Transaction,homeId: string){
      const currentUser = transaction.userId;
      const transactionDate = transaction.transactionDate;
      const newDate = new Date(transactionDate);
      const currentYear = newDate.getFullYear();
      const currentMonth = this.dateService.formatMonth(newDate);
      const origin = transaction.origin;
      const homeRef = this.getHomeRef(homeId,currentYear,currentMonth);

      return homeRef.collection(this.transaction).add(transaction).then(res =>{
        this.addGroupedData(transaction,homeId);
      }).catch(error =>{
          console.log('Error saving data ' + error);
      });
    }



    addGroupedData(transaction: Transaction,homeId: string){
      const currentUser = transaction.userId;
      const transactionDate = transaction.transactionDate;
      const newDate = new Date(transactionDate);
      const currentYear = newDate.getFullYear();
      const currentMonth = this.dateService.formatMonth(newDate);
      const origin = transaction.origin;
      const homeRef = this.getHomeRef(homeId, currentYear, currentMonth);
      return homeRef.collection(this.groupedCollection).doc(transaction.type).get().subscribe(e =>{
          const resp = e.data();
          if(typeof resp !== 'undefined'){
            const amount: number = resp[transaction.category] ?resp[transaction.category] :0;
            const newAmount = amount + transaction.amount;
            const category =transaction.category;
            const obj = {[category]: newAmount};
            homeRef.collection(this.groupedCollection).doc(transaction.type).update(obj);
          }else{
            const category =transaction.category;
            const newAmount =transaction.amount;
            const obj = {[category]: newAmount};
            homeRef.collection(this.groupedCollection).doc(transaction.type).set(obj);
          }
        });
    }
    getFirebaseTimeStamp(){
      return firebase.firestore.FieldValue.serverTimestamp();
    }

    getExpenses(currentYear, currentMonth,homeId){
      const homeRef = this.getHomeRef(homeId, currentYear, currentMonth );
      return homeRef.collection(this.transaction,ref => ref.orderBy('transactionDate', 'desc'))
                     .snapshotChanges();
    }
    getGroupedData(document, currentYear, currentMonth , homeId){
      const homeRef = this.getHomeRef(homeId, currentYear, currentMonth );
      return homeRef.collection(this.groupedCollection).doc(document).get();
    }

    private getHomeRef(homeId,currentYear,currentMonth){
      return this.firestore.collection(this.collectionName)
                .doc(homeId)
                .collection(currentYear.toString())
                .doc(currentMonth.toString());
    }
}

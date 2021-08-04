import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../Item';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {


  groceryCollection = 'grocery';
  kitchenCollection = 'kitchen';
  categoriesDoc = 'categories';
  familyGrocery ='family-grocery';
  constructor(private firestore: AngularFirestore) { }

  addItem(item: Item){
    return this.firestore.collection(this.groceryCollection).add(item);
  }

  updateItem(item: any) {
    return this.firestore.collection(this.groceryCollection).doc(item.id).set(item);
  }


  getItems(): Observable<any>{
    return this.firestore.collection(this.groceryCollection).snapshotChanges();
  }

  getCategories(): Observable<any>{
    return this.firestore.collection(this.kitchenCollection)
               .doc(this.categoriesDoc).valueChanges();
  }

  saveBag(familyId: string, myShoppingBag, tag: string) {
    return this.firestore.collection(this.familyGrocery)
                          .doc(familyId)
                          .set(myShoppingBag);
  }

  getMyBag(familyId: string){
    return this.firestore.collection(this.familyGrocery)
               .doc(familyId)
               .valueChanges();
  }



}

import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection = 'users';
  familyCollection= 'family';

  constructor(private authService: AuthenticationService,
              private afStore: AngularFirestore,) { }

  getUserData(){
    const currentUserId = this.authService.userId;
    const userRef = this.afStore.collection(this.usersCollection).doc(currentUserId);
    return userRef.valueChanges();
 }

 addUserToHome(homeName,email){
  const obj = {homeName, email};
  return this.afStore.collection('home').doc(homeName).collection('users').add(obj);
 }

 createFamily(familyName, members){
  const familyId = this.afStore.createId();
  const data = {familyName, members,familyId};
  return this.afStore.collection(this.familyCollection).doc(familyId)
            .set(data);
 }
 addMemberToFamily(familyId, member){
  const familyRef = this.afStore.collection(this.familyCollection).doc(familyId);
  return familyRef.update({
    members: firebase.firestore.FieldValue.arrayUnion(member)
  });
 }

 getFamilies(email){
   return this.afStore.collection(this.familyCollection, ref =>
      ref.where('members','array-contains',email))
      .snapshotChanges();
 }

 getFamiliesEmailId(email){
  return this.afStore.collection(this.familyCollection, ref =>
     ref.where('members','array-contains',email)).get();
}

getMembersByFamilyId(familyId) {
  const familyRef = this.afStore.collection(this.familyCollection).doc(familyId);
  return familyRef.valueChanges();
}



}

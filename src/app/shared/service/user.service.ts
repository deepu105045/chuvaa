import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection = 'users';
  familyCollection= 'family';

  constructor(private authService: AuthenticationService,
              private firestore: AngularFirestore,) { }

  getUserData(){
    const currentUserId = this.authService.userId;
    const userRef = this.firestore.collection(this.usersCollection).doc(currentUserId);
    return userRef.valueChanges();
 }

 addUserToHome(homeName,email){
  const obj = {homeName, email};
  return this.firestore.collection('home').doc(homeName).collection('users').add(obj);
 }

 createFamily(familyName, members){
  const familyId = this.firestore.createId();
  const data = {familyName, members,familyId};
  return this.firestore.collection(this.familyCollection).doc(familyId)
            .set(data);

 }


}

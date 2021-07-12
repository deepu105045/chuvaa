import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CashflowService } from 'src/app/shared/cash-flow/cashflow.service';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { IonLoaderService } from 'src/app/shared/service/ion-loader.service';
import { UserService } from 'src/app/shared/service/user.service';
import { User } from 'src/app/shared/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  message: string;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public ionLoaderService: IonLoaderService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  signUp(email,password,displayname){
    this.ionLoaderService.simpleLoader();
    this.authService.registerUser(email.value,password.value)
    .then(user =>{
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        this.ionLoaderService.dismissLoader();
        this.router.navigate(['profile-selection']);
        // const persistedUser: User = {
        //   email: email.value,
        //   displayName: displayname.value,
        //   uid:user.user.uid
        // };
        // this.authService.setUserData(persistedUser).then(userData=>{
        //   this.userService.addUserToHome(groupName.value,email.value).then(res =>{
        //     this.ionLoaderService.dismissLoader();
        //     this.router.navigate(['profile-selection']);
        //   }).catch(err =>{
        //     this.ionLoaderService.dismissLoader();
        //   });

        // });
      }
    }).catch( error =>{
      console.log('Error while saving');
      this.message = error.message;
      this.ionLoaderService.dismissLoader();
    });
  }

}


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { IonLoaderService } from 'src/app/shared/service/ion-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  message: string;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastController: ToastController,
    public ionLoaderService: IonLoaderService
  ) {}


  ngOnInit() {
    this.form = new FormGroup({
      email : new FormControl('unittest@gmail.com',{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password : new FormControl('test1234',{
        updateOn: 'blur',
        validators: [Validators.required , Validators.maxLength(180)]
      })
    });
  }


  logIn(){
    this.ionLoaderService.simpleLoader();
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.authService.signIn(email,password)
    .then(res =>{
      this.ionLoaderService.dismissLoader();
      this.router.navigate(['profile-selection']);
    }).catch(err =>{
      this.ionLoaderService.dismissLoader();
      this.message = 'Login failed. Please check credentials';
    });
  }

  register(){
    this.router.navigate(['registration']);
  }

}

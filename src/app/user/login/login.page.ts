import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';

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
    public loadingController: LoadingController
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  logIn(){
    this.presentLoading();
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.authService.signIn(email,password)
    .then(res =>{
      this.router.navigate(['profile-selection']);
    }).catch(err =>{
      this.message = 'Login failed. Please check credentials';
    });
  }

  register(){
    this.router.navigate(['registration']);
  }

}

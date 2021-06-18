import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    public toastController: ToastController
  ) {}


  ngOnInit() {
    this.form = new FormGroup({
      email : new FormControl('deepu105045@gmail.com',{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password : new FormControl('Enter Password',{
        updateOn: 'blur',
        validators: [Validators.required , Validators.maxLength(180)]
      })
    });


  }

  logIn(){
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.authService.signIn(email,password)
    .then(res =>{
      this.router.navigate(['home']);
      // if(this.authService.isEmailVerified){
      //   this.router.navigate(['home']);
      // }else{
      //   this.message = 'Email is not verified';
      //   return false;
      // }
    }).catch(err =>{
      this.message = 'Login failed. Please check credentials';
    });
  }

  register(){
    this.router.navigate(['registration']);
  }

}

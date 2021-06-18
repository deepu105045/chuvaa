import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  message: string
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  signUp(email,password){
    this.authService.registerUser(email.value,password.value)
    .then(res =>{
      console.log('User registerd succesfully');
      this.authService.sendVerificationMail();
      this.router.navigate(['verify-email']);
    }).catch( error =>{
      this.message = error.message;
    });
  }

}

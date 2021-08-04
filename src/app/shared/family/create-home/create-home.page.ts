/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-create-home',
  templateUrl: './create-home.page.html',
  styleUrls: ['./create-home.page.scss'],
})
export class CreateHomePage implements OnInit {
  userData: any;
  myEmail: string;
  form: FormGroup;

  constructor(private authService: AuthenticationService,
              public router: Router,
              private userService: UserService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.userData = this.authService.userInfo;
    this.myEmail = this.userData.email;

    this.form = new FormGroup({
      familyName: new FormControl(null,[Validators.required]),
      members: new FormArray([])
    });

    this.onAddMemeber();
  }

  get memberControls(){
    return (<FormArray>this.form.get('members')).controls;
  }

  onAddMemeber(){
    const memeberCtl = new FormControl(null,[Validators.required]);
    (<FormArray>this.form.get('members')).push(memeberCtl);

  }

  createFamily(){
    const familyName = this.form.get('familyName').value;
    const members = this.form.get('members').value;
    members.push(this.myEmail);
    this.userService.createFamily(familyName, members).then(res =>{
      console.log(res);
      this.router.navigate(['app-dashboard']);
    }).catch(err =>{
      console.log(err)
    });

  }

}

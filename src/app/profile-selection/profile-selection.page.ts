import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/service/authentication.service';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-profile-selection',
  templateUrl: './profile-selection.page.html',
  styleUrls: ['./profile-selection.page.scss'],
})
export class ProfileSelectionPage implements OnInit {
  homeName ='Home';
  familyId:string;

  constructor(private router: Router,
              public userService: UserService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    const user = this.authService.userInfo;
    const currentUserEmail = user.email;
    this.userService.getFamilies(currentUserEmail).subscribe(family =>{
      family.map(e =>{
        const familyName = e.payload.doc.data()['familyName'];
        this.familyId = e.payload.doc.data()['familyId'];
        this.homeName= familyName;
        console.log(familyName);
        console.log(this.familyId);
      });
    });


  }


}

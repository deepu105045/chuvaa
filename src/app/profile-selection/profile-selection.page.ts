import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-profile-selection',
  templateUrl: './profile-selection.page.html',
  styleUrls: ['./profile-selection.page.scss'],
})
export class ProfileSelectionPage implements OnInit {
  homeName ='Home';

  constructor(private router: Router,
              public userService: UserService) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(userData =>{
      this.homeName = userData['homeName'];
    });

  }


}

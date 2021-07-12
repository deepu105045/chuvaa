import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonLoaderService } from 'src/app/shared/service/ion-loader.service';
import { UserService } from 'src/app/shared/service/user.service';
@Component({
  selector: 'app-add-user-to-home',
  templateUrl: './add-user-to-home.page.html',
  styleUrls: ['./add-user-to-home.page.scss'],
})
export class AddUserToHomePage implements OnInit {

  homeName ='House Name';

  constructor(private route: ActivatedRoute,
              public router: Router,
              private userService: UserService,
              private ionLoaderService: IonLoaderService) {}

  ngOnInit() {
    this.homeName = this.route.snapshot.paramMap.get('id');
  }

  addtoHouse(email){
    this.userService.addUserToHome(this.homeName,email.value).then(res =>{
      this.ionLoaderService.dismissLoader();
      this.router.navigate(['profile-selection']);
    }).catch(err =>{
      this.ionLoaderService.dismissLoader();
    });
  }

}

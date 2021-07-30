import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { constants } from '../shared/Constants';
import { AuthenticationService } from '../shared/service/authentication.service';
import { IonLoaderService } from '../shared/service/ion-loader.service';
import { UserService } from '../shared/service/user.service';
import { User } from '../shared/User';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.page.html',
  styleUrls: ['./app-dashboard.page.scss'],
})
export class AppDashboardPage implements OnInit {
  name: string;
  familyName = 'Home';
  familyId: string;
  myData: { familyId: any; familyName: any }[];
  newUser = false;
  constructor(public userService: UserService,
    public router: Router,
    private loaderService: IonLoaderService,
    public authService: AuthenticationService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.authService.user$.subscribe(user => {
      const currentUserEmail = user.email;
      this.name = user.email;
      this.userService.getFamilies(currentUserEmail).subscribe(data => {
        this.myData = data.map(e => ({
          familyId: e.payload.doc.data()[constants.familyId],
          familyName: e.payload.doc.data()[constants.familyName]
        }));
        if(this.myData.length === 0){
          this.newUser = true;
          this.router.navigate(['/app-dashboard/create-home']);
        }
      });
    });
  }
}

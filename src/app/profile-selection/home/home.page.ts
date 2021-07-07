import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CashflowService } from '../../shared/cash-flow/cashflow.service';
import { AuthenticationService } from '../../shared/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userInfo: any;
  homeName: string;

  constructor(private router: Router,
              public authService: AuthenticationService,
              private cashflowService: CashflowService) {
                console.log('Home Page');
    this.cashflowService.getHomeDetails().subscribe(userData  => {
      console.log(userData);
      this.userInfo = userData;
      this.homeName = this.userInfo['homeName'];
    });
  }


}

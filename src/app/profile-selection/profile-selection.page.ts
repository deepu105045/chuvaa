import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-selection',
  templateUrl: './profile-selection.page.html',
  styleUrls: ['./profile-selection.page.scss'],
})
export class ProfileSelectionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


}

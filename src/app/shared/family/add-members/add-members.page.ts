import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { constants } from '../../Constants';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.page.html',
  styleUrls: ['./add-members.page.scss'],
})
export class AddMembersPage implements OnInit {
  name: string;
  myData: { familyId: any; familyName: any}[];
  familyId: any;
  members=[];
  familyName: string;

  constructor(public userService: UserService,
    public authService: AuthenticationService,private activatedroute: ActivatedRoute) { }

    ngOnInit() { }

  ionViewWillEnter() {
    this.activatedroute.paramMap.subscribe(params => {
      this.familyId = params.get('id');
      this.userService.getMembersByFamilyId(this.familyId).subscribe(response =>{
        this.members = response['members'];
        this.familyName = response['familyName'];
      });
  });
  };

  onAddMember(email){
    this.userService.addMemberToFamily(this.familyId, email.value);
  }

}

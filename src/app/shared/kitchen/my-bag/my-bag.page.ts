/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable guard-for-in */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { constants } from '../../Constants';
import { AuthenticationService } from '../../service/authentication.service';
import { KitchenService } from '../../service/kitchen.service';
import { UserService } from '../../service/user.service';
import { AddToBagPage } from '../add-to-bag/add-to-bag.page';

@Component({
  selector: 'app-my-bag',
  templateUrl: './my-bag.page.html',
  styleUrls: ['./my-bag.page.scss'],
})
export class MyBagPage implements OnInit {
  groceryList =[];
  groceryListBackUp =[];
  familyId: string;
  objMap ={};
  constructor(public popoverController: PopoverController,
              private kitchenService: KitchenService,
              private authService: AuthenticationService,
              private userService: UserService,
              public alertController: AlertController
              ) { }

  async ngOnInit() {
    this.authService.user$.subscribe(async user => {
      const currentUserEmail = user.email;
      this.userService.getFamilies(currentUserEmail).subscribe(async data => {
        this.familyId = data.map(a => a.payload.doc.data()[constants.familyId])[0];
        this.kitchenService.getMyBag(this.familyId).subscribe(async data =>{
          if(data){
            this.groceryList =[];
            const persistedBag=  data['bag'];
            for(const obj of persistedBag){
              this.groceryList.push(obj);
            }
            await this.groupByCategory();
          }
          this.groceryListBackUp = this.groceryList;
          if(this.groceryList.length === 0){
            await this.getDefaultGrocery()
          }
        });
      });
    });

  }

async groupByCategory() {
  this.groceryList.forEach(element => {
    const makeKey = element.category;
     if(!this.objMap[makeKey]) {
       this.objMap[makeKey] = [];
     }

    this.objMap[makeKey].push({
      itemName: element.itemName,
    });
   });
   console.log(this.objMap);
   return this.objMap;
}


  getDefaultGrocery(){
      this.kitchenService.getItems().subscribe((data) =>{
      this.groceryList = data.map(e => ({
        id: e.payload.doc.id,
        itemName: e.payload.doc.data().itemName,
        brands: e.payload.doc.data().brands,
        category: e.payload.doc.data().category
      }));
      this.groceryListBackUp = this.groceryList;
    });
  }

  async filterList(evt) {
    this.groceryList = this.groceryListBackUp;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.groceryList = this.groceryList.filter(item => {
      if (item.itemName && searchTerm) {
        return (item.itemName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }


  ionViewWillEnter() {
  }

  ionViewDidLeave() {
    this.presentAlertConfirm();
  }

  async addToBag(item){
    const popover = await this.popoverController.create({
      component: AddToBagPage,
      componentProps:{item},
      translucent: true
    });
    await popover.present();
    return popover.onDidDismiss().then(response =>{
      if(response.data){
        const key = response.data.data.id;
        const value = response.data.data;
        this.addToList(key,value);
      }
    }).catch(err =>{
      console.log(err);
    });

  }

  addToList(key,value){

    const objIndex = this.groceryList.findIndex((obj => obj.id === key));
    this.groceryList[objIndex].selectedBrand = value.brand;
    this.groceryList[objIndex].selectedQty = value.qty;
  }

  saveToBag(){
    const bag = {bag: this.groceryList};
    this.kitchenService.saveBag(this.familyId,bag,'latest');
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you want to save your shopping list ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.saveToBag();
          }
        }
      ]
    });

    await alert.present();
  }


}

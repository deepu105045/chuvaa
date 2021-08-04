import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { KitchenService } from '../../service/kitchen.service';
import { AddItemPage } from '../add-item/add-item.page';
import { AddToBagPage } from '../add-to-bag/add-to-bag.page';
@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.page.html',
  styleUrls: ['./grocery-list.page.scss'],
})
export class GroceryListPage implements OnInit {
  groceryList =[];
  myShoppingBag =[];
  groceryListBackUp =[];
  showInput = false;


  constructor(public popoverController: PopoverController,
              private kitchenService: KitchenService) { }

  ngOnInit() {

    this.kitchenService.getItems().subscribe((data) =>{
      this.groceryList = data.map(e => ({
        id: e.payload.doc.id,
        itemName: e.payload.doc.data().itemName,
        brands: e.payload.doc.data().brands
      }));
      this.groceryListBackUp = this.groceryList;
    });

  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: AddItemPage,
      translucent: true
    });
    return await popover.present();
  }

  async addToBag(item){
    const popover = await this.popoverController.create({
      component: AddToBagPage,
      componentProps:{item, myShoppingBag:this.myShoppingBag},
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
    this.myShoppingBag.push(value);
    const objIndex = this.groceryList.findIndex((obj => obj.id === key));
    this.groceryList[objIndex].selectedBrand = value.brand;
    this.groceryList[objIndex].selectedQty = value.qty;
  }

  async filterList(evt) {
    console.log(this.groceryListBackUp);
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

  editItem(item){
    item.itemName = item.itemName;
    // this.kitchenService.updateItem(item);
  }

  toggleInput(){
    this.showInput = !this.showInput;
    console.log(this.showInput)
  }

}

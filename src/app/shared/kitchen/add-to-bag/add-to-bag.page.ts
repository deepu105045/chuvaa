import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Item } from '../../Item';

@Component({
  selector: 'app-add-to-bag',
  templateUrl: './add-to-bag.page.html',
  styleUrls: ['./add-to-bag.page.scss'],
})
export class AddToBagPage implements OnInit {
  @Input() item: Item;
  @Input() popover;

  brandIndex: number;
  brand = 'any brand';
  qty ='0 gm';
  existingorderQty: any;
  qtyInput='';

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    if(this.item.selectedQty){
      this.qtyInput = this.item.selectedQty;
    }
    if(this.item.selectedBrand){
      this.brand = this.item.selectedBrand;
    }
  }
  selectBrand(brand,idx){
    this.brandIndex = idx;
    this.brand = brand;
  }
  addtoBag(note){
    const obj = {
      id: this.item.id,
      itemName: this.item.itemName,
      brand:  this.brand,
      qty: this.qtyInput || this.qty,
      note : note.value
    };
    this.popover.dismiss({ data: obj });
  }


}

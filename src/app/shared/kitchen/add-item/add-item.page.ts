/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KitchenService } from '../../service/kitchen.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  categories: any;
  form: FormGroup;
  items = [];
  itemsBackUp =[];
  show = false;

  constructor(private kitchenService: KitchenService) { }

  ngOnInit() {
    this.form = new FormGroup({
      category: new FormControl('Grocery', [Validators.required]),
      item: new FormControl(null, [Validators.required]),
      brands: new FormControl('Any brand', [Validators.required])
    });
  }

  ionViewWillEnter() {
    this.kitchenService.getCategories().subscribe((categoryList) =>{
      this.categories = categoryList.Level1;
    });

    this.kitchenService.getItems().forEach(item =>{
      item.map(e =>{
        this.items.push(e.payload.doc.data().itemName);
      });
      this.itemsBackUp = this.items;
    });
  }



  addItem(){
    const category = this.form.get('category').value;
    const itemName = this.form.get('item').value;
    const brandsString = this.form.get('brands').value;
    const brands = brandsString.split(',');
    const item = {category,itemName,brands};
    this.kitchenService.addItem(item).then(res =>{
      this.form.reset({category});
    }).catch(err =>{
      console.log('Error saving data' + err);
    });
  }

  async filterList(evt) {
    console.log(this.itemsBackUp);
    this.items = this.itemsBackUp;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.items = this.items.filter(item => {
      if (item && searchTerm) {
        this.show= true;
        return (item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }




}

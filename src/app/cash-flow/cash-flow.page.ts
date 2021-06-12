import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SegmentChangeEventDetail} from '@ionic/core';
import { constants } from '../shared/Constants';
import { DateService } from '../shared/date.service';
import { Transaction } from '../shared/Transaction';
import { CashflowService } from './cashflow.service';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.page.html',
  styleUrls: ['./cash-flow.page.scss'],
})
export class CashFlowPage implements OnInit {
  active: string;
  today = new Date();
  message: string;
  color: string;
  showForm = true;
  monthYear: string;

  form: FormGroup;
  constructor(private cashflow: CashflowService,
              public toastController: ToastController,
              private dateService: DateService) {
    this.active = constants.expense;
    this.setFormStatus();

  }


  ngOnInit() {
    this.monthYear = this.dateService.getCurrentMonthYear();

    this.form = new FormGroup({
      transactionDate : new FormControl(this.today.toISOString(),{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      category : new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required , Validators.maxLength(180)]
      }),
      amount: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required , Validators.min(1)]
      })
    });
  }

  async presentToast(){
    const toast = await this.toastController.create({
      message : this.message,
      duration: 2000,
      color: this.color
    });
    toast.present();
  }

  onSave(){
    const transactionDate = this.form.get('transactionDate').value;
    const category =  this.form.get('category').value;
    const amount = this.form.get('amount').value;
    const userId = 'Deepu';
    const type = this.active;
    const transaction: Transaction = {transactionDate,category,amount, userId, type };
    console.log(transaction);

    this.cashflow.addExpense(transaction).then(res =>{
      this.form.reset({transactionDate});
      this.message = 'Saved successfully.';
      this.color = 'success';
      this.presentToast();

    }).catch(error =>{
      this.message = 'Error . Try again !!!';
      this.color = 'danger';
      this.presentToast();
    });

  }

  onClear(): void{
    this.form.reset();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    this.active = event.detail.value;
    this.setFormStatus();
    console.log(this.active);
    console.log(this.showForm);
  }

  setFormStatus(){
    if( this.active === constants.transactions){
      this.showForm = false;
    }else{
      this.showForm = true;
    }
  }



}

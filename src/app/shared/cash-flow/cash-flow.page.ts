import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { constants } from '../Constants';
import { DateService } from '../service/date.service';
import { Transaction } from '../Transaction';
import { CashflowService } from './cashflow.service';
import { AuthenticationService } from '../service/authentication.service';
import { ExpenseService } from '../service/expense.service';
import { ActivatedRoute } from '@angular/router';

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
  showForm: boolean;
  monthYear: string;
  familyId: string;

  form: FormGroup;
  constructor(
              public toastController: ToastController,
              private dateService: DateService,
              private authService: AuthenticationService,
              private expenseService: ExpenseService,
              private activatedroute: ActivatedRoute) {
    this.showForm = false;
    this.active = constants.dashboard;
    this.setFormStatus();

  }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.familyId = params.get('id');
  });

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
    const user = this.authService.userInfo;
    const transactionDate = this.form.get(constants.transactionDate).value;
    const category =  this.form.get(constants.category).value;
    const amount = this.form.get(constants.amount).value;
    const userId = user.uid;
    const type = this.active;
    const createdAt = this.expenseService.getFirebaseTimeStamp();
    const origin = constants.home;
    const transaction: Transaction = {transactionDate,category,amount, userId, type ,createdAt, origin};

    this.expenseService.addExpense(transaction,this.familyId).then(res =>{
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

  onFilterUpdate(event){
    this.active = event.detail.value;
    this.setFormStatus();
  }

  setFormStatus(){

    if( this.active === constants.transactions || this.active === constants.dashboard){
      this.showForm = false;
    }else{
      this.showForm = true;
    }
  }



}

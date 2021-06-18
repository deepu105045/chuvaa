import { Injectable } from '@angular/core';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getCurrentMonthYear(){
    return new Date().toLocaleString('en-us',{month:'long', year:'numeric'});
  }

  get currentMonth(){
    return new Date().toLocaleString('en-us',{month:'long'});
  }
  get currentYear(){
    return new Date().toLocaleString('en-us',{year:'numeric'});
  }

  formatMonth(date: Date){
    return date.toLocaleString('en-us',{month:'long'});
  }

  get allMonths(){
    return ['January','February','March','April','May','June','July','August','September','October','November','December'];
  }

  get allYears(){
    const list: number[] = [];
    const year = this.currentYear;
    let y: number = +year;
    y = y-5;
    for (let i = y; i < y+10; i++) {
      list.push(i);
    }
    return list;

  }
}

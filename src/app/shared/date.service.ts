import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getCurrentMonthYear(){
    return new Date().toLocaleString('en-us',{month:'short', year:'numeric'});

  }
}

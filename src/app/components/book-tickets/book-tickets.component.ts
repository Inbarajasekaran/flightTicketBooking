import { Component, Inject, Injectable, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {
  bookTicket: FormGroup
  flightData = [];
  selectedFlight;
  classSelected: number = null;
  enableClass: boolean = false;
  showTotal: boolean = false;
  totalAmt: number = null;
  remainingSeat: number = null;
  myTicktes = [];
  noOfTkt: number = null
  isLogin: boolean;
  constructor(private db: DbService, private fb: FormBuilder, private dlg: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.db.userData.forEach(dt => {
      if (dt['isLogin'] == true) {
        this.isLogin = true
      } else {
        this.isLogin = false;
      }
    })

    this.bookTicket = this.fb.group({
      flightNameControl: ['', Validators.required],
      class: ['', Validators.required],
      noOfTkt: ['', Validators.required]
    })

    this.db.flightData.forEach(ele => {
      this.flightData.push(ele)
    })
  }

  flightChoosed(val) {
    this.enableClass = true
    this.selectedFlight = val;
    console.log(this.selectedFlight)
  }

  classChoosed(val) {
    this.totalAmt = null;
    this.remainingSeat = null;
    this.bookTicket.controls.noOfTkt.setValue('')
    this.classSelected = val.value
    if (val.value == 1) {
      this.bookTicket.controls.noOfTkt.setValidators([Validators.max(this.selectedFlight['businessSeat']), Validators.min(1)])
    } else if (val.value == 2) {
      this.bookTicket.controls.noOfTkt.setValidators([Validators.max(this.selectedFlight['economicSeat']), Validators.min(1)])
    }
  }

  getNoOfTkt(val) {
    this.noOfTkt = val
    this.showTotal = true
    if (this.classSelected == 1) {
      this.totalAmt = this.selectedFlight['businessClassPrice'] * val
      this.remainingSeat = this.selectedFlight['businessSeat'] - val
      // this.selectedFlight['businessSeat'] = this.selectedFlight['businessSeat'] - val
    } else if (this.classSelected == 2) {
      this.totalAmt = this.selectedFlight['economicClassPrice'] * val
      this.remainingSeat = this.selectedFlight['economicSeat'] - val
      // this.selectedFlight['economicSeat'] = this.selectedFlight['economicSeat'] - val
    }
  }

  submitTktBooking() {
    this.selectedFlight['businessSeat'] = this.selectedFlight['businessSeat'] - this.noOfTkt
    this.selectedFlight['economicSeat'] = this.selectedFlight['economicSeat'] - this.noOfTkt
    this.myTicktes.push(this.bookTicket.value)
    this.db.booked.push(this.bookTicket.value)
    console.log("Booked flight", this.db.booked)
    this.totalAmt = null;
    this.remainingSeat = null;
    this.bookTicket.reset();
    this.bookTicket.updateValueAndValidity();
  }

  loginAndBook() {
    this.dlg.open(LoginComponent, {
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res == true) {
        this.isLogin = res
      }
    })
  }


}

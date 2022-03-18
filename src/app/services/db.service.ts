import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

  userData = [{ username: 'ADMIN', password: '0011', isLogin : false }]

  flightData = [

    {
      flightName: 101,
      businessSeat: 12,
      economicSeat: 8,
      businessClassPrice: 2000,
      economicClassPrice: 1000
    },
    {
      flightName: 102,
      businessSeat: 12,
      economicSeat: 8,
      businessClassPrice: 2000,
      economicClassPrice: 1000
    },
    {
      flightName: 103,
      businessSeat: 12,
      economicSeat: 8,
      businessClassPrice: 2000,
      economicClassPrice: 1000
    }
  ]

  booked = []


}

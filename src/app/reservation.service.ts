import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private activeUser :number = null;

  constructor() { }

  setActiveUser(userId: number) {
    this.activeUser = userId;
  }

  getActiveUser() {
    return this.activeUser;
  }

}

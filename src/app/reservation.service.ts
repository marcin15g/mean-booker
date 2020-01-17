import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { Client } from './models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private activeUser: number = null;
  private activeRoom: number = null;

  constructor(private http: HttpClient) { }

  setActiveUserId(userId: number) {
    this.activeUser = userId;
  }

  getActiveUser() {
    return this.activeUser;
  }

  setActiveRoomId(roomId: number) {
    this.activeRoom = roomId;
  }

  getActiveRoom() {
    return this.activeRoom;
  }

}

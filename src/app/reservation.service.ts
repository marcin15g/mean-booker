import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './models/client.model';
import { Subject } from 'rxjs';
import { Room } from './models/room.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private activeUserId: number = null;
  private activeRoomId: number = null;
  private validationCode: string = '';
  private userUpdated = new Subject<Client>();

  constructor(private http: HttpClient) { }

  setActiveUserId(userId: number) {
    this.activeUserId = userId;
  }

  setActiveRoomId(roomId: number) {
    this.activeRoomId = roomId;
  }

  getActiveUserId() {
    return this.activeUserId;
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  getActiveUser() {
      return this.http.get<{client: Client}>("http://localhost:3000/api/clients/"+ this.activeUserId);
  }

  getActiveRoom() {
    return this.http.get<{room: Room}>('http://localhost:3000/api/rooms/' + this.activeRoomId);
  }

  uploadReservation() {
      if(this.validationCode === '') {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        for(let i = 0; i < 5; i++) {
          this.validationCode += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      }
      this.http.post<{message: string}>('http://localhost:3000/api/reservations', {userId: this.activeUserId, roomId: this.activeRoomId, code: this.validationCode})
      .subscribe((res) => {
        console.log(res);
      });
  }

}

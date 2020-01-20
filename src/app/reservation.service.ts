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

  private userUpdated = new Subject<Client>();

  constructor(private http: HttpClient) { }

  setActiveUserId(userId: number) {
    this.activeUserId = userId;
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

  setActiveRoomId(roomId: number) {
    this.activeRoomId = roomId;
  }

}

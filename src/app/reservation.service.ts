import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './models/client.model';
import { Subject } from 'rxjs';
import { Room } from './models/room.model';
import { Reservation } from './models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private activeUserId: number = null;
  private activeRoomId: number = null;
  private validationCode: string = '';
  private reservations: Reservation[] = [];
  private reservationUpdated = new Subject<Reservation[]>();

  constructor(private http: HttpClient) { }

  getValidationCode() {
    return this.validationCode;
  }

  setActiveUserId(userId: number) {
    this.activeUserId = userId;
  }

  setActiveRoomId(roomId: number) {
    this.activeRoomId = roomId;
  }

  getActiveUserId() {
    return this.activeUserId;
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

  getReservationsUpdateListener() {
    return this.reservationUpdated.asObservable();
  }

  getReservations() {
    this.http.get<{message: string, reservationArr: Reservation[]}>("http://localhost:3000/api/reservations")
    .subscribe((res) => {
      this.reservations = res.reservationArr;
      this.reservationUpdated.next([...this.reservations]);
    });
  };

  deleteReservation(deleteId: number, roomId: number) {
    this.http.delete('http://localhost:3000/api/reservations/' + deleteId + '/' + roomId)
    .subscribe((res) => {
      const updatedList = this.reservations.filter(reservation => reservation.id !== deleteId);
      this.reservations = updatedList;
      console.log(updatedList);
      this.reservationUpdated.next([...this.reservations]);
    })
  }
}

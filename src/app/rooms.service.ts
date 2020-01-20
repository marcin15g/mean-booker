import { Injectable } from '@angular/core';
import { Room } from './models/room.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private rooms: Room[] = [];
  private roomsUpdated = new Subject<Room[]>();

  constructor(private http: HttpClient) { }

  getRoomsUpdateListener() {
    return this.roomsUpdated.asObservable();
  }

  getRooms() {
    this.http.get<{message: string, roomsArr: Room[]}>('http://localhost:3000/api/rooms')
      .subscribe((res) => {
        console.log(res);
        this.rooms = res.roomsArr;
        this.roomsUpdated.next([...this.rooms]);
      });
  };
}

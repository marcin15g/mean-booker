import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from '../models/room.model';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent implements OnInit {

  constructor( public roomsService: RoomsService ) { }

  private rooms: Room[] = [];
  private roomSub: Subscription;

  ngOnInit() {
    this.roomsService.getRooms();
    this.roomSub = this.roomsService.getRoomsUpdateListener()
      .subscribe((rooms) => {
        this.rooms = rooms;
        console.log(this.rooms);
      });
  };

  ngOnDestroy() {
    this.roomSub.unsubscribe();
  }

}

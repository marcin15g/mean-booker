import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from '../models/room.model';
import { RoomsService } from '../rooms.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent implements OnInit {

  constructor( public roomsService: RoomsService, public reservationService: ReservationService, public route: ActivatedRoute, public router: Router ) { }

  private rooms: Room[] = [];
  private roomSub: Subscription;
  private mode = 'list';
          activeUser = null;

  ngOnInit() {
      this.activeUser = this.reservationService.getActiveUser();
      console.log(this.activeUser);
      if(this.route.snapshot.routeConfig.path === 'select-room') {
        this.mode = 'select';
        if(this.activeUser === null) {
          console.error('PLEASE FILL USER INFO FIRST');
          this.router.navigateByUrl('/');
        } else {
          console.log(this.activeUser);
        }
    }

    this.roomsService.getRooms();
    this.roomSub = this.roomsService.getRoomsUpdateListener()
      .subscribe((rooms) => {
        this.rooms = rooms;
      });
  };

  onReserve(room: Room) {
    if(this.mode === 'list') {
      console.error('PLEASE FILL USER INFO FIRST');
      this.router.navigateByUrl('/');
    } else {
      console.log(this.activeUser);
      console.log(room);
    }    
  }

  ngOnDestroy() {
    this.roomSub.unsubscribe();
  }

}

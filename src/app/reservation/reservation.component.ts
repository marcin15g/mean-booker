import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Client } from '../models/client.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  private client: Client = {
    id: null,
    name: "",
    surname: "",
    email: ""
  };
  private room: Room = {
    id: null,
    number: "",
    beds: null,
    available: true

  };

  constructor(public reservationService: ReservationService, private router: Router) { }

  ngOnInit() {
    if(this.reservationService.getActiveUserId() === null) this.router.navigateByUrl('/');
    else {
      //Get current client info
      this.reservationService.getActiveUser()
      .subscribe((res) => {
        this.client = {
          id: res[0].id,
          name: res[0].name,
          surname: res[0].surname,
          email: res[0].email,
        }
      });
      //Get current room info
      this.reservationService.getActiveRoom()
      .subscribe((res) => {
        this.room = {
            id: res[0].id,
            number:res[0].number,
            beds: res[0].beds,
            available: res[0].available
        }
      });
    }

  }

  confirmReservation() {
    this.reservationService.uploadReservation();
    this.router.navigateByUrl('finalize');
  }

}

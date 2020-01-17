import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  private userId: number;
  private roomId: number;

  constructor(public reservationService: ReservationService) { }

  ngOnInit() {
    this.userId = this.reservationService.getActiveUser();
    this.roomId = this.reservationService.getActiveRoom();
  }

}

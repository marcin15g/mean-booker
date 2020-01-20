import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../models/reservation.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit {

  private reservations: Reservation[] = [];
  private reservationsSub: Subscription;

  constructor(public reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getReservations();
    this.reservationsSub = this.reservationService.getReservationsUpdateListener()
    .subscribe((reservations) => {
      this.reservations = reservations;
      console.log(this.reservations);
    });

  }

  ngOnDestroy() {
    this.reservationsSub.unsubscribe();
  }

}

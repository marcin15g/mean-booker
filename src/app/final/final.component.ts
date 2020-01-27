import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Client } from '../models/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  private client: Client = null;
  private code: String = null;

  constructor(private reservationService: ReservationService, public router: Router) { }

  ngOnInit() {
    if(this.reservationService.getActiveUserId() === null) this.router.navigateByUrl('/');
    else {
    //Get client info
    this.reservationService.getActiveUser()
    .subscribe((res) => {
      this.client = {
        id: res[0].id,
        name: res[0].name,
        surname: res[0].surname,
        email: res[0].email,
      }
    });
    //Get validation code
    this.code = this.reservationService.getValidationCode();
    }
  }
}

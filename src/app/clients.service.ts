import { Injectable } from '@angular/core';
import { Client } from './models/client.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReservationService } from './reservation.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clients: Client[] = [];
  private clientsUpdated = new Subject<Client[]>();

  constructor(private http: HttpClient, private reservationService: ReservationService) { }

  getClientsUpdateListener() {
    return this.clientsUpdated.asObservable();
  }

  addClient(newClient: Client) {
    return new Promise((resolve, reject) => {
      this.http.post<{message: string, result: any}>('http://localhost:3000/api/clients', {name: newClient.name, surname: newClient.surname, email: newClient.email})
      .subscribe((response) => {
        this.clients.push(newClient);
        this.clientsUpdated.next([...this.clients]);
        this.reservationService.setActiveUserId(response.result);
        resolve();
      }); 
    });
  }

  getClients() {
    this.http.get<{message: string, clientsArr: Client[]}>('http://localhost:3000/api/clients', )
      .subscribe((res) => {
        this.clients = res.clientsArr;
        this.clientsUpdated.next([...this.clients]);
      })
  }
}

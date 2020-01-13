import { Injectable } from '@angular/core';
import { Client } from './models/client.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clients: Client[] = [];
  private clientsUpdated = new Subject<Client[]>();

  constructor(private http: HttpClient) { }

  addClient(newClient: Client) {
    this.http.post('http//localhost:3000/api/clients', {name: newClient.name, surname: newClient.surname})
      .subscribe((res) => {
        this.clients.push(newClient);
        this.clientsUpdated.next([...this.clients]);
      });
  }
}

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

  getClientsUpdateListener() {
    return this.clientsUpdated.asObservable();
  }

  addClient(newClient: Client) {
    this.http.post<{message: string}>('http://localhost:3000/api/clients', {name: newClient.name, surname: newClient.surname, email: newClient.email})
      .subscribe((res) => {
        console.log(res.message);
        this.clients.push(newClient);
        this.clientsUpdated.next([...this.clients]);
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

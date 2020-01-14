import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client.model';
import { ClientsService } from '../clients.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  private clients: Client[] = [];
  private clientsSub: Subscription;

  constructor(public clientsService: ClientsService) { }

  ngOnInit() {
    this.clientsService.getClients();
    this.clientsSub = this.clientsService.getClientsUpdateListener()
      .subscribe((clients) => {
        this.clients = clients;
      });
    
  }

  ngOnDestroy() {
    this.clientsSub.unsubscribe();
  }

}

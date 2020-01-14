import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  constructor(public clientsService: ClientsService) { }

  ngOnInit() {
  }


  onSubmit(newClientForm: NgForm) {
    if(newClientForm.invalid) {
      return;
    } else {
      const newClient: Client = {
        id: null,
        name: newClientForm.value.name,
        surname: newClientForm.value.surname,
        email: newClientForm.value.email
      }
      this.clientsService.addClient(newClient);
    }
  }

}

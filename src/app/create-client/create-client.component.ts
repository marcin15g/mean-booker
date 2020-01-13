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
      console.error('Invalid data in the form!');
      return;
    } else {
      const newClient: Client = {
        id: null,
        name: newClientForm.value.name,
        surname: newClientForm.value.surname
      }
      this.clientsService.addClient(newClient);
    }
  }

}

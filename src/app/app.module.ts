import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Material imports
import { MatButtonModule, MatInputModule, MatExpansionModule, MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';


import { ListClientComponent } from './list-client/list-client.component';
import { AppComponent } from './app.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { ReservationComponent } from './reservation/reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateClientComponent,
    HeaderComponent,
    ListClientComponent,
    ListRoomsComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule, 
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    AppRoutingModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

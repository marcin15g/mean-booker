import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FinalComponent } from './final/final.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';


const routes: Routes = [
    {path: '', component: CreateClientComponent},
    {path: 'clients', component: ListClientComponent},
    {path: 'rooms', component: ListRoomsComponent},
    {path: 'select-room', component: ListRoomsComponent},
    {path: 'reservation', component: ReservationComponent},
    {path: 'finalize', component: FinalComponent},
    {path: 'reservations', component: ListReservationsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
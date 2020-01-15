import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';


const routes: Routes = [
    {path: '', component: CreateClientComponent},
    {path: 'clients', component: ListClientComponent},
    {path: 'rooms', component: ListRoomsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
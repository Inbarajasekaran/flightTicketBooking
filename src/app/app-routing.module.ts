import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookTicketsComponent } from './components/book-tickets/book-tickets.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'book-ticket', component: BookTicketsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { BookTicketsComponent } from './components/book-tickets/book-tickets.component';
import { MaterialsModule } from './material/materials/materials.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookTicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule
  ],
  providers: [ {provide : MatDialogRef, useValue : {}}, {provide : MAT_DIALOG_DATA, useValue : {} } ],
  bootstrap: [AppComponent]
})
export class AppModule { }

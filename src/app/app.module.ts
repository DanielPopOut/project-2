import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewEventComponent } from './new-event/new-event.component';
import { AppRoutingModule } from './app-routing.module';
import { CardElementComponent } from './card-element/card-element.component';
import { FormsModule } from '@angular/forms';
import { EventService } from './event.service';
import { EventComponent } from './event/event.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewEventComponent,
    CardElementComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }

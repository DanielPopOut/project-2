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
import { GuestComponent } from './guest/guest.component';
import { CardCreationComponent } from './card-creation/card-creation.component';
import { CardComponent } from './card/card.component';
import { CardElementService } from './card-element.service';
import { CardElementListFilterPipe } from './card-element-list-filter.pipe';
import { CardElementDetailsComponent } from './card-element-details/card-element-details.component';
import { UserService } from './user.service';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewEventComponent,
    CardElementComponent,
    EventComponent,
    GuestComponent,
    CardCreationComponent,
    CardComponent,
    CardElementListFilterPipe,
    CardElementDetailsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [EventService, CardElementService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewEventComponent } from './new-event/new-event.component';
import { AppRoutingModule } from './app-routing.module';
import { CardElementComponent } from './card-element/card-element.component';
import { FormsModule } from '@angular/forms';
import { EventComponentComponent } from './event-component/event-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewEventComponent,
    CardElementComponent,
    EventComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

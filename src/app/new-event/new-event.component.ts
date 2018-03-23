import { Component, OnInit } from '@angular/core';
import { HomeCookEvent } from '../home-cook-event';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  public model;
  public test_model = {host_name: "eqerezq", name: "ezQVINPNPEZf", place: "nIEZPFNIPEA", date: "2018-03-30T12:42", mail: "feafeafea"}

  constructor(private eventService: EventService, private router: Router ) { }

  ngOnInit() {
    this.model = new HomeCookEvent()
  }

  public onSubmit() {
    console.log(this.model);
    if(this.eventService.createNewEvent(this.model)) {
      this.router.navigate(['event']);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { HomeCookEvent } from '../home-cook-event';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  public model;

  constructor() { }

  ngOnInit() {
    this.model = new HomeCookEvent()
  }

  public onSubmit() {
    console.log(this.model);
  }

}

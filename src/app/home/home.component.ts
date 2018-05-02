import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private windowSize: number;
  constructor(private router: Router) { }

  ngOnInit() {
      this.windowSize = window.screen.width ;
  }


  newEvent(): void {
    this.router.navigate(['newevent']);
  }
}

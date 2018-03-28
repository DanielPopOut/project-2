import { Component, Input, OnInit } from '@angular/core';
import { CardElement } from '../card-element';
import { CardElementService } from '../card-element.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-card-element',
  templateUrl: './card-element.component.html',
  styleUrls: ['./card-element.component.css']
})
export class CardElementComponent implements OnInit {
  public title = 'none';
  public showInfosBoolean: boolean;
  public color : string;
  @Input() cardElement : CardElement;

  constructor(private cardElementService : CardElementService, private eventService: EventService) { }

  ngOnInit() {
      this.showInfosBoolean = true;
      this.cardElement.voters = [];
      this.color = this.getRandomColor();
  }

  public showInfos(bool : boolean): void {
    this.showInfosBoolean = bool;
  }

  public voteForCard(): void {
      if(this.eventService.testUsername()) {
          this.cardElementService.voteForCardElement(this.cardElement.id, this.eventService.username);
      } else {
          console.log("connectez vous svp");
      }
  }

    public unvoteForCard(): void {
        if(this.eventService.testUsername()) {
            this.cardElementService.unvoteForCardElement(this.cardElement.id, this.eventService.username);
        } else {
            console.log("connectez vous svp");
        }
    }

    public getRandomColor(): string {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return "#"+((1<<24)*Math.random()|0).toString(16);
        // return color;
    }


}

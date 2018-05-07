import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeCookCard } from '../home-cook-card';
import { CardElementService } from '../card-element.service';
import { EventService } from '../event.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    @Input() private card: HomeCookCard;
    @Input() private cardNumberToShow: string;
    @Output() onNewElementClick = new EventEmitter<HomeCookCard>();

    constructor(private cardElementService: CardElementService, private eventService: EventService) {
    }

    ngOnInit() {
    }

    public newElementButtonClick() : void {
        this.onNewElementClick.emit(this.card);
    }

    public deleteCardButtonClick() : void {
        this.eventService.deleteCard(this.card);
    }

}

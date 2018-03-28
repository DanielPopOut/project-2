import { Component, Input, OnInit } from '@angular/core';
import { HomeCookCard } from '../home-cook-card';
import { CardElementService } from '../card-element.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    @Input() private card: HomeCookCard;

    constructor(private cardElementService: CardElementService) {
    }

    ngOnInit() {
    }

    public setTypeCardElementToCreate() {
        this.cardElementService.setCardElementToCreate(this.card);
    }

}

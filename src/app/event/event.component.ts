import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../event.service';
import { HomeCookEvent } from '../home-cook-event';
import { CardElementService } from '../card-element.service';
import { HomeCookCard } from '../home-cook-card';
import { UserService } from '../user.service';
import { ModalsService } from '../modals.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
    public event: HomeCookEvent;
    public newCardElementName: string;
    @ViewChild('newCardElementNameInput') newCardElementNameInput: ElementRef;
    @ViewChild('buttonHiddenCardElementModal') buttonHiddenCardElementModal: ElementRef;
    public textCardNumber: string;
    private swipeCoord?: [number, number];
    private swipeTime?: number;
    private innerWidth: number;
    private oldCardNumber: number;

    constructor(private eventService: EventService, private cardElementService: CardElementService,
                private userService: UserService, private modalsService: ModalsService, private route: ActivatedRoute) {
        this.innerWidth = (window.screen.width);
        this.eventService.innerWidth = window.screen.width;
    }

    ngOnInit() {
        if (!this.eventService.event) {
            this.route.params.subscribe(params => {
                console.log(params.id, params.hostname);
                //this.username = params.username;
                this.eventService.requestEventFromServer(params.id + '/' + params.hostname);
            });
        }
        setTimeout(() => {
                this.userService.retrieveUsername();
            }, 500);
        this.newCardElementName = "";
        this.event = this.eventService.event;
        //this.eventService.cardNumberToShow = this.eventService.cardNumberToShow;
        this.updateCardText();
    }

    public updateCardText() {
        this.textCardNumber = (this.eventService.cardNumberToShow + 1).toString() + '/' + this.event.cards.length.toString();
    }

    public newCardElementClick(card: HomeCookCard): void {
        this.modalsService.showNewCardElementModal(card);
    }

    public shouldCardBeHidden(card: HomeCookCard): string {
        if (this.eventService.isContainerWidthSmall()) {
            if (this.eventService.cardNumberToShow !== null && card._id !== this.event.cards[this.eventService.cardNumberToShow]._id) {
                return "none";
            }
        }
        return "initial";
    }

    public setCardToShowValue(cardNumber: number): void {
        if (cardNumber < 0) {
            cardNumber += this.event.cards.length;
        }
        this.eventService.setCardNumberToShow(cardNumber % this.event.cards.length);
        this.updateCardText();
    }

    public cardToShowPlusOne(): void {
        this.setCardToShowValue(this.eventService.cardNumberToShow + 1);
    }

    public cardToShowMinusOne(): void {
        this.setCardToShowValue(this.eventService.cardNumberToShow - 1);
    }

    swipe(e: TouchEvent, when: string): void {
        const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        const time = new Date().getTime();

        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
            this.oldCardNumber = this.eventService.cardNumberToShow;
        }

        else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            const duration = time - this.swipeTime;

            if (duration < 600 //Rapid
                && (Math.abs(direction[0]) > 30) //Long enough
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { //Horizontal enough
                const swipe = direction[0] < 0 ? 'next' : 'previous';
                //Do whatever you want with swipe
                if (swipe === 'next') {
                    this.cardToShowPlusOne();
                } else {
                    this.cardToShowMinusOne();
                }
            }
        }

        else if (when === "move") {
            const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            const duration = time - this.swipeTime;
            const intervalsSize = (this.innerWidth / this.event.cards.length) * 9 / 10;
            const intervalsNumber = Math.round(direction[0] / intervalsSize);

            if (duration > 600) { //Horizontal enough
                this.setCardToShowValue(this.oldCardNumber + intervalsNumber);
            }
        }

    }

    public onResize($event: Event): void {
        this.innerWidth = (window.screen.width);
        this.eventService.innerWidth = window.screen.width;
    }

    public createNewCard(): void {
        this.modalsService.showNewCardModal();
    }
}

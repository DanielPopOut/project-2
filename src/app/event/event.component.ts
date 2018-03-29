import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../event.service';
import { HomeCookEvent } from '../home-cook-event';
import { CardElementService } from '../card-element.service';
import { HomeCookCard } from '../home-cook-card';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
    public event: HomeCookEvent;
    public newCardElementName: string;
    public cardNumberToShow: number;
    @ViewChild('newCardElementNameInput') newCardElementNameInput: ElementRef;
    @ViewChild('buttonHiddenCardElementModal') buttonHiddenCardElementModal: ElementRef;
    private swipeCoord?: [number, number];
    private swipeTime?: number;
    private innerWidth: number;
    private oldCardNumber: number;

    constructor(private eventService: EventService, private cardElementService: CardElementService) {
        this.innerWidth = (window.screen.width);

    }

    ngOnInit() {
        this.newCardElementName = "";
        this.event = this.eventService.event;
        this.cardNumberToShow = 0;
        setTimeout(() => {
            if (this.eventService.savedCardElementList) {
                this.cardElementService.restoreCardElementList();
            }
        }, 150);

    }

    public openNewCardElementModal(): void {
        this.buttonHiddenCardElementModal.nativeElement.click();
    }

    public createNewCardElement(event_id: string, name: string): void {
        this.cardElementService.newCardElement(event_id, name);
        this.newCardElementName = "";
    }

    public onNewElementClick(card: HomeCookCard): void {
        if (!this.eventService.isUserNameValid()) {
            this.eventService.userInvalidEvent(true);
            return;
        } else {
            this.openNewCardElementModal();
            this.cardElementService.setCardElementToCreate(card);
            this.newCardElementNameInputFocus();
        }
    }

    public newCardElementNameInputFocus(): void {
        setTimeout(() => {
            this.newCardElementNameInput.nativeElement.focus();
        }, 500);
    }

    public shouldCardBeHidden(card_id): string {
        if (this.isContainerWidthSmall()) {
            if (card_id !== this.event.cards[this.cardNumberToShow].id) {
                return "none";
            }
        }
        return "initial";
    }

    public isContainerWidthSmall(): boolean {
        return this.innerWidth < 576;
    }

    public setCardToShowValue(cardNumber: number): void {
        if (cardNumber < 0) {
            cardNumber += this.event.cards.length;
        }
        this.cardNumberToShow = cardNumber % this.event.cards.length;
    }

    public cardToShowPlusOne(): void {
        this.cardNumberToShow = (this.cardNumberToShow + 1) % this.event.cards.length;
    }

    public cardToShowMinusOne(): void {
        this.cardNumberToShow = this.cardNumberToShow - 1;
        if (this.cardNumberToShow < 0) {
            this.cardNumberToShow = this.event.cards.length - 1;
        }
    }

    swipe(e: TouchEvent, when: string): void {
        const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        const time = new Date().getTime();

        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
            this.oldCardNumber = this.cardNumberToShow;
        }

        else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            const duration = time - this.swipeTime;

            if (duration < 1000 //Rapid
                && (Math.abs(direction[0]) > 30) //Long enough
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { //Horizontal enough
                const swipe = direction[0] < 0 ? 'next' : 'previous';
                //Do whatever you want with swipe
                if ('next') {
                    this.cardToShowPlusOne();
                } else {
                    this.cardToShowMinusOne();
                }
            }
        }

        else if (when === "move") {
            const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            const duration = time - this.swipeTime;
            const intervalsSize = (this.innerWidth / this.event.cards.length)*9/10 ;
            const intervalsNumber = Math.round(direction[0]/intervalsSize);

            if (duration > 500 && (Math.abs(direction[0]) > intervalsSize)) { //Horizontal enough
                this.setCardToShowValue(this.oldCardNumber + intervalsNumber);
            }
        }

    }

    public onResize($event: Event): void {
        this.innerWidth = (window.screen.width);
    }
}

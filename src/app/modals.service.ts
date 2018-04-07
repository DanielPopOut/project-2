import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HomeCookCard } from './home-cook-card';
import { UserService } from './user.service';

@Injectable()
export class ModalsService {
    private newCardSubject = new Subject<boolean>();
    public newCardSubject$ = this.newCardSubject.asObservable();
    private newCardElementSubject = new Subject<HomeCookCard>();
    public newCardElementSubject$ = this.newCardElementSubject.asObservable();

    constructor(private userService: UserService) {
    }

    public showNewCardModal() : void {
        if (this.userService.isUserNameValid()) {
            this.newCardSubject.next(true);
        } else {
            this.userService.showConnexionFormEvent(true);
            return;
        }
    }

    public showNewCardElementModal(card: HomeCookCard) : void {
        if (this.userService.isUserNameValid()) {
            this.newCardElementSubject.next(card);
        } else {
            this.userService.showConnexionFormEvent(true);
        }
    }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ModalParams } from './modalClass';

@Injectable()
export class ModalService {
    private newValueSubject = new Subject<string | boolean>();
    public newValueSubject$ = this.newValueSubject.asObservable();
    private openModalSubject = new Subject<ModalParams>();
    public openModalSubject$ = this.openModalSubject.asObservable();

    constructor() {
    }

    public sendNewValue(newValue: string | boolean): void {
        this.newValueSubject.next(newValue);
    }

    public openModal(modalData: ModalParams): void {
        this.openModalSubject.next(modalData);
    }

    public listenToNewValueAndOpenModal(component: any, modalData: ModalParams, callback: any) {
        setTimeout(() => {
            let modalSubscription = this.newValueSubject$.subscribe(value => {
                if (value) {
                    callback(value);
                }
                modalSubscription.unsubscribe();
            });
            this.openModal(modalData);
        }, 50);
    }
}

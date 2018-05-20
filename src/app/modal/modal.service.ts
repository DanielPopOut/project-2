import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ModalParams } from './modalClass';

@Injectable()
export class ModalService {
    private newValueSubject = new Subject<string>();
    public newValueSubject$ = this.newValueSubject.asObservable();
    private openModalSubject = new Subject<ModalParams>();
    public openModalSubject$ = this.openModalSubject.asObservable();

    constructor() {
    }

    public sendNewValue(newValue: string): void {
        this.newValueSubject.next(newValue);
    }

    public openModal(modalData: ModalParams): void {
        this.openModalSubject.next(modalData);
    }


}

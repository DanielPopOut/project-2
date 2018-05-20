import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Modal, ModalClass } from './modalClass';

@Injectable()
export class ModalService {
    private newValueSubject = new Subject<string>();
    public newValueSubject$ = this.newValueSubject.asObservable();
    private openModalSubject = new Subject<ModalClass>();
    public openModalSubject$ = this.openModalSubject.asObservable();

    constructor() {
    }

    public sendNewValue(newValue: string): void {
        this.newValueSubject.next(newValue);
    }

    public openModal(modalData: ModalClass): void {
        this.openModalSubject.next(modalData);
    }
}

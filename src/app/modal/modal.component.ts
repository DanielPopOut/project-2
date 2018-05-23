import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModalService } from './modal.service';
import { ModalParams } from './modalClass';
import { ServerService } from '../server.service';
import { EventService } from '../event.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    public modalState: string;
    public modalData: ModalParams;
    public initialModalData: ModalParams;
    public modalOpacity: number = 0;

    // @ViewChild('modalContainer') modalContainer: ElementRef;
    @ViewChild('newDataInput') newDataInput: ElementRef;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        let x = event.keyCode;
        if (x === 27) { //Escape
            this.sendValueAndCloseModal(null);
        } else if (x=== 13) {
            this.returnNewValue();
        }
    }


    constructor(private modalService: ModalService, private serverService: ServerService, private eventService: EventService) {
        this.modalData = new ModalParams();
        this.modalService.openModalSubject$.subscribe(modalData => {
            this.modalData = modalData;
            this.initialModalData = Object.assign({}, modalData);
            this.showModal();
        });
        this.closeModal();
    }

    ngOnInit() {
    }

    public closeModal() {
        this.modalState = 'hidden';
        this.modalOpacity = 0;
    }

    public showModal() {
        this.modalState = '';
        if (this.modalData.modalType === ModalParams.INPUT_ENTRY_MODAL) {
            this.newDataInputFocus();
        }
        setTimeout(()=> {
            this.modalOpacity = 1;
        }, 50);
    }

    public sendValueAndCloseModal(valueToSend: string | boolean) {
        this.modalService.sendNewValue(valueToSend);
        this.closeModal();
    }

    public returnNewValue(valueToReturn: string = null) {

        switch (this.modalData.modalType) {
            case ModalParams.QUESTION_MODAL :
                this.sendValueAndCloseModal(true);
                break;
            case ModalParams.ONE_CHOICE_MODAL :
                this.sendValueAndCloseModal(valueToReturn);
                break;
            case ModalParams.INPUT_ENTRY_MODAL :
                if (this.modalData.modalValue !== this.initialModalData.modalValue) {
                    this.sendValueAndCloseModal(this.modalData.modalValue);
                } else {
                    this.sendValueAndCloseModal(null);
                }
                break;
        }
    }


    public modalBodyDisplay(): string {
        if (this.modalData.modalType === ModalParams.QUESTION_MODAL && !this.modalData.bodyMessage) {
            return 'none';
        } else {
            return '';
        }
    }

    public modalFooterDisplay(): string {
        if (this.modalData.modalType === ModalParams.ONE_CHOICE_MODAL) {
            return 'none';
        } else {
            return '';
        }
    }

    public newDataInputFocus(): void {
        setTimeout(() => {
            this.newDataInput.nativeElement.focus();
        }, 400)
    }

}


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

    @ViewChild('modalContainer') modalContainer: ElementRef;

    constructor(private modalService: ModalService, private serverService: ServerService, private eventService: EventService) {
        this.modalData =  new ModalParams();
        this.modalService.openModalSubject$.subscribe(modalData => {
            this.modalData = modalData;
            this.initialModalData = Object.assign({},modalData);
            this.showModal();
        });
        this.modalState = 'hidden';

    }

    ngOnInit() {
    }

    // public setModal(title: string, bodyMessage: string, inputType: string, modalValue: string, buttonValidText: string, buttonCancelText: string) {
    //     this.title = title;
    //     this.bodyMessage = bodyMessage;
    //     this.inputType = inputType;
    //     this.modalValue = modalValue;
    //     this.buttonValidText = buttonValidText;
    //     this.buttonCancelText = buttonCancelText;
    // }

    public closeModalWithCancelButton() {
        this.modalService.sendNewValue(null);
        this.closeModal();
    }

    public closeModal() {
        this.modalState = 'hidden';
    }

    public showModal() {
        this.modalState = 'show';
    }

    public returnNewValue() {
        if (this.modalData.modalValue) {
            if (this.modalData.modalValue !== this.initialModalData.modalValue) {
                this.modalService.sendNewValue(this.modalData.modalValue);
            }
            this.closeModal();
        }
    }

    public fakeShowModal() {
        let modalData = new ModalParams();
        modalData.setModalData("Modifier", '', 'Banana');
        this.modalService.openModal(modalData);
    }
}


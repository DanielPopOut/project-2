import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from './modal.service';
import { ModalClass } from './modalClass';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    public modalState: string;
    public modalData: ModalClass;
    public initialModalData: ModalClass;

    @ViewChild('modalContainer') modalContainer: ElementRef;

    constructor(private modalService: ModalService) {
        this.modalData =  new ModalClass();
        this.modalService.openModalSubject$.subscribe(modalData => {
            this.modalData = modalData;
            this.initialModalData = Object.assign({},modalData);
            this.showModal();
        });
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



    public closeModal() {
        this.modalState = 'hidden';
    }

    public showModal() {
        this.modalState = 'show';
    }

    public returnNewValue() {
        console.log('newvalue');
        if (this.modalData.modalValue) {
            if (this.modalData.modalValue !== this.initialModalData.modalValue) {
                this.modalService.sendNewValue(this.modalData.modalValue);
            }
            this.closeModal();
        }
    }

    public fakeShowModal() {
        let modalData = new ModalClass();
        modalData.setModalData("Modifier", '', 'Banana');
        this.modalService.openModal(modalData);
    }
}

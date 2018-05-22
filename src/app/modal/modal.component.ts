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

    public sendValueAndCloseModal(valueToSend : string | boolean){
        this.modalService.sendNewValue(valueToSend);
        this.closeModal();
    }

    public returnNewValue(valueToReturn: string) {
        console.log('valeur retournée', valueToReturn);
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

    returnValue(valueToReturn) {

    }

    fakeShowModal() {
        let modalData = new ModalParams();
        // modalData.setModalIput("Modifier", '', 'Banana');
        // modalData.setQuestion("Veux tu vraiment supprimer cette carte ?", 'Attention ce sera irréversible');
        modalData.setOneChoice("Que veux tu ? ", ['Banane', 'Avocat', 'Lait']);
        this.modalService.openModal(modalData);
    }
}


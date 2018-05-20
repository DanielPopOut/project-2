export class ModalClass {
    public title: string;
    public bodyMessage: string;
    public inputType: string;
    public buttonValidText: string;
    public buttonCancelText: string;
    public modalValue = '';


    public setModalData(title: string, bodyMessage: string, modalValue: string, inputType: string = 'text', buttonValidText: string = 'Valid',  buttonCancelText: string = 'cancel') {
        this.title = title;
        this.bodyMessage = bodyMessage;
        this.inputType = inputType;
        this.buttonValidText = buttonValidText;
        this.buttonCancelText = buttonCancelText;
        this.modalValue = modalValue;
    }

}

export class ModalParams {
    static INPUT_ENTRY_MODAL: number = 0;
    static ONE_CHOICE_MODAL: number = 1;
    static QUESTION_MODAL: number = 2;
    public title: string;
    public bodyMessage: string;
    public inputType: string;
    public buttonValidText: string;
    public buttonCancelText: string;
    public modalValue = '';
    public modalType: number;
    public arrayChoices: Array<string>;

    public setModalIput(title: string, bodyMessage: string, modalValue: string, inputType: string = 'text', buttonValidText: string = 'Valid', buttonCancelText: string = 'cancel') {
        this.modalType = ModalParams.INPUT_ENTRY_MODAL;
        this.title = title;
        this.bodyMessage = bodyMessage;
        this.inputType = inputType;
        this.buttonValidText = buttonValidText;
        this.buttonCancelText = buttonCancelText;
        this.modalValue = modalValue;
    }


    public setOneChoice(title: string, arrayChoices: Array<string>) {
        this.modalType = ModalParams.ONE_CHOICE_MODAL;
        this.inputType = null;
        this.buttonValidText = null;
        this.buttonCancelText = null;
        this.title = title;
        this.arrayChoices = arrayChoices;
    }

    public setQuestion(title: string, bodyMessage: string = '', buttonValidText: string = 'Ok', buttonCancelText: string = 'Cancel') {
        this.modalType = ModalParams.QUESTION_MODAL;
        this.inputType = null;
        this.title = title;
        this.buttonValidText = buttonValidText;
        this.buttonCancelText = buttonCancelText;
        this.bodyMessage = bodyMessage;
    }

}

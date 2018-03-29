import { Voter } from './voter';

export class CardElement {
    public id: string;
    public title: string;
    public type: number;
    public event_id: string;
    public card_id: string;
    public voters: Voter[];
    public added_by: string;
    public voterLimit: number;


    constructor(id: string, title: string, type: number, event_id: string, card_id: string, added_by: string, voterLimit: number = -1) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.event_id = event_id;
        this.card_id = card_id;
        this.added_by = added_by;
        this.voterLimit = voterLimit;
        this.voters = [];
    }


    public mangerBobob(): void {
        this.voterLimit+=1;
    }
}

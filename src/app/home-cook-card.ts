export class HomeCookCard {
    public name: string;
    public type: number;
    public _id: string;
    public event_id: string;

    constructor(id: string, name: string, type: number, event_id : string = "ez" ) {
        this._id = id;
        this.name = name;
        this.type = type;
        this.event_id = event_id;
    }
}

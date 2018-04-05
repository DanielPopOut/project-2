export class HomeCookCard {
    public name: string;
    public type: number;
    public _id: string;

    constructor(id: string, name: string, type: number) {
        this._id = id;
        this.name = name;
        this.type = type;
    }
}

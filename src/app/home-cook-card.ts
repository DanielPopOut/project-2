export class HomeCookCard {
    public name: string;
    public type: number;
    public id: string;

    constructor(id: string, name: string, type: number) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}

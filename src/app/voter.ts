export class Voter {
    public name: string;
    public nbVotes: number;


    constructor(name: string, nbVotes: number = 0) {
        this.name = name;
        this.nbVotes = nbVotes;
    }

    public vote(): void {
        this.nbVotes = (this.nbVotes + 1)%3;
    }
}

export class Voter {
    public name: string;
    public nbVotes: number;


    constructor(name: string, nbVotes: number = 0) {
        this.name = name;
        this.nbVotes = nbVotes;
    }

    public addVote(): void {
        this.nbVotes += 1;
    }

    public removeVote(): void {
        this.nbVotes -= 1;
        this.nbVotes = this.nbVotes > 0 ? this.nbVotes : 0;
    }
}

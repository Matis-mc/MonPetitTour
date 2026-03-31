class Ranking {

    idUser: number;
    firstName: string;
    lastName: string;
    score: number;
    rank: number;

    constructor(idUser: number, firstName: string, lastName: string, score: number, rank: number) {
        this.idUser = idUser;
        this.firstName = firstName;
        this.lastName = lastName;
        this.score = score;
        this.rank = rank;
    }

    getIdUser(): number {
        return this.idUser;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getScore(): number {
        return this.score;
    }

    getRank(): number {
        return this.rank;
    }

    setIdUser(idUser: number): void {
        this.idUser = idUser;
    }

    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    setScore(score: number): void {
        this.score = score;
    }

    setRank(rank: number): void {
        this.rank = rank;
    }
}

export { Ranking };
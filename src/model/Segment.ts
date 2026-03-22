import { Coordonnee } from "./Coordonnee";

class Segment {
    start: Coordonnee;
    end: Coordonnee;
    distance: number;
    categorie: string;
    slope: number;
    ranking?: number[]

    constructor(start: Coordonnee, end: Coordonnee, distance: number, categorie: string, slope: number, ranking: number[]) {
        this.start = start;
        this.end = end;
        this.distance = distance;
        this.categorie = categorie;
        this.slope = slope;
        this.ranking = ranking;
    }

    getStart(): Coordonnee {
        return this.start;
    }

    getEnd(): Coordonnee {
        return this.end;
    }

    getDistance(): number {
        return this.distance;
    }

    getCategorie(): string {
        return this.categorie;
    }

    getSlope(): number {
        return this.slope;
    }

    getRanking(): number[] {
        return this.ranking;
    }

    setStart(start: Coordonnee): void {
        this.start = start;
    }

    setEnd(end: Coordonnee): void {
        this.end = end;
    }

    setDistance(distance: number): void {
        this.distance = distance;
    }

    setCategorie(categorie: string): void {
        this.categorie = categorie;
    }

    setSlope(slope: number): void {
        this.slope = slope;
    }

    setRanking(ranking: number[]): void {
        this.ranking = ranking;
    }
}

export { Segment };
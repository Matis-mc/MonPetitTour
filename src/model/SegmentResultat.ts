import { Coordonnee } from "./Coordonnee";
import { RiderTime } from "./RiderTime";

class SegmentResultat {
    name: string;
    categorie: string;
    start: Coordonnee;
    end: Coordonnee;
    slope: number;
    points: number[];
    ranking: RiderTime[]

    constructor(name: string, categorie: string, start: Coordonnee, end: Coordonnee, slope: number, points: number[], ranking: RiderTime[]) {
        this.name = name;
        this.categorie = categorie;
        this.start = start;
        this.end = end;
        this.slope = slope;
        this.points = points;
        this.ranking = ranking;
    }

    getName(): string {
        return this.name;
    }

    getStart(): Coordonnee {
        return this.start;
    }

    getEnd(): Coordonnee {
        return this.end;
    }

    getPoints(): number[] {
        return this.points;
    }

    getRanking(): RiderTime[] {
        return this.ranking;
    }

    setName(name: string): void {
        this.name = name;
    }

    setStart(start: Coordonnee): void {
        this.start = start;
    }

    setEnd(end: Coordonnee): void {
        this.end = end;
    }

    setPoints(points: number[]): void {
        this.points = points;
    }

    setRanking(ranking: RiderTime[]): void {
        this.ranking = ranking;
    }

    getCategorie(): string {
        return this.categorie;
    }

    setCategorie(categorie: string): void {
        this.categorie = categorie;
    }

    getSlope(): number {
        return this.slope;
    }

    setSlope(slope: number): void {
        this.slope = slope;
    }
}

export { SegmentResultat };
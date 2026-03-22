import { Coordonnee } from "./Coordonnee";
import { RiderTime } from "./RiderTime";

class SegmentResultat {
    name: string;
    start: Coordonnee;
    end: Coordonnee;
    points: number[];
    ranking: RiderTime[]

    constructor(name: string, start: Coordonnee, end: Coordonnee, points: number[], ranking: RiderTime[]) {
        this.name = name;
        this.start = start;
        this.end = end;
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
}

export { SegmentResultat };
import { Coordonnee } from "./Coordonnee";

class Segment {
    start: Coordonnee;
    end: Coordonnee;
    distance: number;
    categorie: string;
    slope: number;
    points?: number[]

    constructor(start: Coordonnee, end: Coordonnee, distance: number, categorie: string, slope: number, points: number[]) {
        this.start = start;
        this.end = end;
        this.distance = distance;
        this.categorie = categorie;
        this.slope = slope;
        this.points = points;
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

    getPoints(): number[] {
        return this.points;
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

    setPoints(points: number[]): void {
        this.points = points;
    }
}

export { Segment };
import { Coordonnee } from "./Coordonnee";

class Segment {
    start: Coordonnee;
    end: Coordonnee;
    distance: number;
    category: string;
    slope: number;
    points?: number[];
    name?: string;
    ranking?: number[];

    constructor(start: Coordonnee, end: Coordonnee, distance: number, category: string, slope: number, points: number[]) {
        this.start = start;
        this.end = end;
        this.distance = distance;
        this.category = category;
        this.slope = slope;
        this.points = points;
        this.name = "segment";
        this.ranking = [];
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

    getCategory(): string {
        return this.category;
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

    setCategory(category: string): void {
        this.category = category;
    }

    setSlope(slope: number): void {
        this.slope = slope;
    }

    setPoints(points: number[]): void {
        this.points = points;
    }
}

export { Segment };

function getCategoryByCode(category: string): string {
    throw new Error("Function not implemented.");
}

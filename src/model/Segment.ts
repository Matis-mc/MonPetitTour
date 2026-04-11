import { getCategorie } from "@/utils/GpxUtils";
import { Coordonnee } from "./Coordonnee";
import L from 'leaflet'


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

    static createFromMap(startPoint: L.LatLng, endPoint: L.LatLng, distance: number, slope: number) {
        return new Segment(
            new Coordonnee(startPoint.lat, startPoint.lng),
            new Coordonnee(endPoint.lat, endPoint.lng),
            distance,
            getCategorie(slope),
            slope,
            [15, 10, 5]
        )
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
        return this.points!;
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

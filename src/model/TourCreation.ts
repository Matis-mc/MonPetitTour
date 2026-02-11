import { Segment } from "./Segment";

class TourCreation {

    id?: number;
    name: string;
    description: string;
    date: Date;
    segments: Segment[];
    gpxFile?: File;

    constructor(name: string, description: string, date: Date, segments: Segment[], id?: number) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.segments = segments;
        if (id) {
            this.id = id;
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getDate(): Date {
        return this.date;
    }

    getSegments(): Segment[] {
        return this.segments;
    } 

    getGpxFile(): File {
        return this.gpxFile;
    }   
    
    setName(name: string): void {
        this.name = name;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setDate(date: Date): void {
        this.date = date;
    }

    setSegments(segments: Segment[]): void {
        this.segments = segments;
    }   

    setGpxFile(gpxFile: File): void {
        this.gpxFile = gpxFile;
    }
}

export { TourCreation };

import { SegmentResultat } from "./SegmentResultat";
import { TourRankings } from "./TourRankings";

class TourResultat {

    id?: number;
    name: string;
    description: string;
    segments: SegmentResultat[];
    ranking: TourRankings;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    gpxFile?: File;

    constructor(id: number, name: string, description: string, segments: SegmentResultat[], ranking: TourRankings, status: string, createdAt: Date, updatedAt: Date, gpxFile?: File) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.segments = segments;
        this.ranking = ranking;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.gpxFile = gpxFile;
    }

    getId(): number {
        return this.id!;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getSegments(): SegmentResultat[] {
        return this.segments;
    }

    getRanking(): TourRankings {
        return this.ranking;
    }

    getStatus(): string {
        return this.status;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    getGpxFile(): File | undefined {
        return this.gpxFile;
    }

    setId(id: number): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setSegments(segments: SegmentResultat[]): void {
        this.segments = segments;
    }

    setRanking(ranking: TourRankings): void {
        this.ranking = ranking;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }

    setGpxFile(gpxFile: File): void {
        this.gpxFile = gpxFile;
    }
}

export { TourResultat };

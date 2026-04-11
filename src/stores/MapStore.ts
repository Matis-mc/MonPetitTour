import { defineStore } from 'pinia';
import type { Segment } from '../model/Segment';

export const useMapStore = defineStore('map', {
    state: () => ({
        gpxFile: null as File | null,
        segments: [] as Array<Segment>,
        elevationData: [] as Array<GpxPointProfile>
    }),
    getters: {
        getGpxFile(state) {
            return state.gpxFile;
        },
        getSegments(state) {
            return state.segments;
        },
        getElevationData(state) {
            return state.elevationData;
        }
    },
    actions: {
        setGpxFile(file: File) {
            console.log('MapStore: setGpxFile called with', file.name);
            this.gpxFile = file;
        },
        addSegment(segment: Segment) {
            this.segments.push(segment);
        },
        clearSegments() {
            this.segments = [];
        },
        removeLastSegment() {
            this.segments.pop();
        },
        updateSegmentCategory(index: number, category: string) {
            if (index >= 0 && index < this.segments.length) {
                this.segments[index].category = category;
            }
        },
        updateSegmentRanking(segmentIndex: number, rankIndex: number, value: number) {
            if (segmentIndex >= 0 && segmentIndex < this.segments.length) {
                if (!this.segments[segmentIndex].points) {
                    this.segments[segmentIndex].points = [];
                }
                this.segments[segmentIndex].points![rankIndex] = value;
            }
        },
        setElevationData(elevationData: Array<GpxPointProfile>) {
            console.log('MapStore: setElevationData called with', elevationData);
            this.elevationData = elevationData;
        }
    }

});
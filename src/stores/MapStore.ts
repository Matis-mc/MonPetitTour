import { defineStore} from 'pinia';
import type { Segment } from '../model/Segment';

export const useMapStore = defineStore('map', {
    state: () => ({
        gpxFile: null as File | null,
        segments: [] as Array<Segment>
    }),
    getters: {
        getGpxFile(state) {
            return state.gpxFile;
        },
        getSegments(state) {
            return state.segments;
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
        updateSegmentCategory(index: number, category: string) {
            if (index >= 0 && index < this.segments.length) {
                this.segments[index].categorie = category;
            }
        },
        updateSegmentRanking(segmentIndex: number, rankIndex: number, value: number) {
            if (segmentIndex >= 0 && segmentIndex < this.segments.length) {
                if (!this.segments[segmentIndex].ranking) {
                    this.segments[segmentIndex].ranking = [];
                }
                this.segments[segmentIndex].ranking![rankIndex] = value;
            }
        }
    }

});
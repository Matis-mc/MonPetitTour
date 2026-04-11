import { CATEGORIES } from "@/constants/categories"
import L from 'leaflet'

export const getColorBySlope = (slope: number): string => {
    if (slope > 10) return '#1a1a1a'  // noir        > +10%
    if (slope > 5) return '#ef4444'  // rouge    +5% à +10%
    if (slope > 3) return '#eab308'  // jaune    +3% à  +5%
    if (slope >= -3) return '#22c55e'  // vert     -3% à  +3%
    if (slope >= -5) return '#eab308'  // jaune    -5% à  -3%
    if (slope >= -10) return '#ef4444'  // rouge   -10% à  -5%
    return '#1a1a1a'                         // noir        < -10%
}

export const getCategorie = (slope: number): string => {
    if (slope < -3) return CATEGORIES.DESCENT.code
    if (slope > 3) return CATEGORIES.MOUNTAIN.code
    return CATEGORIES.FLAT.code
}


export const getElevationData = (gpx: any) => {
    if (!gpx) return;

    const elevationData: GpxPointProfile[] = [];
    const layers = gpx.getLayers()
    layers.forEach((trackLayer: any) => {
        const subLayers = trackLayer.getLayers ? trackLayer.getLayers() : [trackLayer]
        subLayers.forEach((segLayer: any) => {
            const points: L.LatLng[] = segLayer.getLatLngs ? segLayer.getLatLngs() : [];
            elevationData.push(...points.map((p: any) => new GpxPointProfile(p.lat, p.lng, p.meta?.ele || 0)));
        })

    })
    return elevationData;
}
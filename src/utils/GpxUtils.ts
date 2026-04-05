import { CATEGORIES } from "@/constants/categories"
import { Coordonnee } from "@/model/Coordonnee"
import { Segment } from "@/model/Segment"

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
class Segment {
    latDebut: number;
    lonDebut: number;
    latFin: number;
    lonFin: number;
    distance: number;
    categorie: string;
    slope: number;
    ranking?: number[]

    constructor(
        latDebut: number,
        lonDebut: number,
        latFin: number,
        lonFin: number,
        distance: number,
        categorie: string,
        slope: number,
        ranking: number[]
    ) {
        this.latDebut = latDebut;
        this.lonDebut = lonDebut;
        this.latFin = latFin;
        this.lonFin = lonFin;
        this.distance = distance;
        this.categorie = categorie;
        this.slope = slope;
        this.ranking = ranking
    } 

}

export { Segment };
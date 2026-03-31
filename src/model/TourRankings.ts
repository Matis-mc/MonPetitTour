import { Ranking } from "./Ranking";

class TourRankings {

    general: Ranking[];
    mountain!: Ranking[];
    sprint!: Ranking[];
    descent!: Ranking[];

    constructor(general: Ranking[], mountain: Ranking[], sprint: Ranking[], descent: Ranking[]) {
        this.general = general;
        this.mountain = mountain;
        this.sprint = sprint;
        this.descent = descent;
    }

    getGeneral(): Ranking[] {
        return this.general;
    }

    getMountain(): Ranking[] {
        return this.mountain;
    }

    getSprint(): Ranking[] {
        return this.sprint;
    }

    getDescent(): Ranking[] {
        return this.descent;
    }

    setGeneral(general: Ranking[]): void {
        this.general = general;
    }

    setMountain(mountain: Ranking[]): void {
        this.mountain = mountain;
    }

    setSprint(sprint: Ranking[]): void {
        this.sprint = sprint;
    }

    setDescent(descent: Ranking[]): void {
        this.descent = descent;
    }

}

export { TourRankings };
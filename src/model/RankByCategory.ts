import { Ranking } from "./Ranking";

class RankByCategory {
    category: string;
    rank: Ranking | null;

    constructor(category: string, rank: Ranking | null) {
        this.category = category;
        this.rank = rank;
    }
}

export { RankByCategory };
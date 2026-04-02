import { Ranking } from "@/model/Ranking"
import { TourResultat } from "@/model/TourResultat"

class RankingService {


    getUserResult = (tour: TourResultat, user: any) => {

        console.log("Tour result", tour);
        console.log("User", user);

        let generalRank = this.getUserRank(tour.getRanking().getGeneral(), user)
        let sprintRank = this.getUserRank(tour.getRanking().getSprint(), user)
        let mountainRank = this.getUserRank(tour.getRanking().getMountain(), user)
        let descentRank = this.getUserRank(tour.getRanking().getDescent(), user)

        let allResults = [
            { "category": "G", "rank": generalRank },
            { "category": "S", "rank": sprintRank },
            { "category": "M", "rank": mountainRank },
            { "category": "D", "rank": descentRank }
        ]

        console.log("All user result", allResults);

        return allResults.filter(r => r.rank != null);
    }

    getUserRank = (ranks: Ranking[], user: any) => {
        if (ranks === null || ranks === undefined) {
            return null;
        }
        // todo : à remettre quand ajout suer ok
        //return ranks.find((r: Ranking) => r.idUser === user.value?.id);
        return ranks[0];
    }


}

export default new RankingService();
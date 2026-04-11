import { RankByCategory } from "@/model/RankByCategory";
import { Ranking } from "@/model/Ranking"
import { TourResultat } from "@/model/TourResultat"

class RankingService {


    getUserResult = (tour: TourResultat, user: any): RankByCategory[] => {

        console.log("Tour result", tour);
        console.log("User", user);

        let generalRank = this.getUserRank(tour.getRanking().getGeneral(), user)
        let sprintRank = this.getUserRank(tour.getRanking().getSprint(), user)
        let mountainRank = this.getUserRank(tour.getRanking().getMountain(), user)
        let descentRank = this.getUserRank(tour.getRanking().getDescent(), user)

        let allResults = [
            new RankByCategory("G", generalRank),
            new RankByCategory("S", sprintRank),
            new RankByCategory("M", mountainRank),
            new RankByCategory("D", descentRank)
        ]

        console.log("All user result", allResults);

        return allResults.filter(r => r.rank != null);
    }

    getUserRank = (ranks: Ranking[], user: any) => {
        if (ranks === null || ranks === undefined) {
            return null;
        }
        console.log("Ranks", ranks);
        console.log("User", user);
        // todo : à remettre quand ajout suer ok
        //return ranks.find((r: Ranking) => r.idUser === user.value?.id);
        return ranks[0];
    }


}

export default new RankingService();
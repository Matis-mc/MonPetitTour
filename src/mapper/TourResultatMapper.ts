import { Ranking } from "@/model/Ranking";
import { Rider } from "@/model/Rider";
import { RiderTime } from "@/model/RiderTime";
import { SegmentResultat } from "@/model/SegmentResultat";
import { TourRankings } from "@/model/TourRankings";
import { TourResultat } from "@/model/TourResultat";

export function mapToTourResultat(t: any): TourResultat {
    let segments = [] as SegmentResultat[];
    t.segments.forEach((s: any) => {
        segments.push(mapToSegmentResultat(s));
    });
    let rankingDescent = mapToRankingArray(t.rankings.descent);
    let rankingGeneral = mapToRankingArray(t.rankings.general);
    let rankingMountain = mapToRankingArray(t.rankings.mountain);
    let rankingSprint = mapToRankingArray(t.rankings.sprint);

    return new TourResultat(t._id, t.name, t.description, segments,
        new TourRankings(rankingGeneral, rankingMountain, rankingSprint, rankingDescent), t.status, t.created_at, t.updated_at, t.gpx_content);
}

export function mapToTourResultatWithoutRankings(t: any): TourResultat {
    let segments = [] as SegmentResultat[];
    t.segments.forEach((s: any) => {
        segments.push(mapToSegmentResultatWithoutRankings(s));
    });
    return new TourResultat(t._id, t.name, t.description, segments,
        new TourRankings([], [], [], []), t.status, t.created_at, t.updated_at, t.gpx_content);
}

const mapToSegmentResultat = (s: any) => {
    let riderTimes = [] as RiderTime[];
    s.ranking.forEach((r: any) => {
        riderTimes.push(mapToRiderTime(r));
    });
    return new SegmentResultat(s.name, s.categorie, s.start, s.end, s.slope, s.points, riderTimes);
}

const mapToSegmentResultatWithoutRankings = (s: any) => {
    return new SegmentResultat(s.name, s.categorie, s.start, s.end, s.slope, s.points, []);
}

const mapToRiderTime = (r: any) => {
    console.log("mapToRiderTime " + JSON.stringify(r));
    return new RiderTime(
        new Rider(r.user.id, r.user.firstname, r.user.lastname, r.user.profile_image), r.time);
}

const mapToRankingArray = (r: any) => {
    let rankings = [] as Ranking[];
    r.forEach((r: any, index: number) => {
        rankings.push(mapToRankingElement(r, index));
    });

    return rankings;
}

const mapToRankingElement = (r: any, index: number) => {
    return new Ranking(r.user.id, r.user.firstname, r.user.lastname, r.score, index + 1);
}

import { StravaActivitee } from "@/model/StravaActivitee";

export function mapToStravaActivitee(raw: any): StravaActivitee {
    return new StravaActivitee(
        String(raw.id),
        raw.name,
        raw.distance,
        new Date(raw.start_date)
    );
}

export function mapToStravaActiviteeList(rawList: any[]): StravaActivitee[] {
    return rawList.map(mapToStravaActivitee);
}

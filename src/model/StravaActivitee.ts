class StravaActivitee {
    id: string;
    name: string;
    distance: number;
    start_date: Date;

    constructor(id: string, name: string, distance: number, start_date: Date) {
        this.id = id;
        this.name = name;
        this.distance = distance;
        this.start_date = start_date;
    }
}

export { StravaActivitee };
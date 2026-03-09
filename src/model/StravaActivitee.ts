class StravaActivitee {
    id: string;
    name: string;
    distance: number;
    date: Date;

    constructor(id: string, name: string, distance: number, date: Date) {
        this.id = id;
        this.name = name;
        this.distance = distance;
        this.date = date;
    }
}

export { StravaActivitee };
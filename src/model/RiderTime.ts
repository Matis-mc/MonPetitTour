import { Rider } from "./Rider";

class RiderTime {
    rider: Rider;
    time: number;

    constructor(rider: Rider, time: number) {
        this.rider = rider;
        this.time = time;
    }

    getRider(): Rider {
        return this.rider;
    }

    getTime(): number {
        return this.time;
    }

    setRider(rider: Rider): void {
        this.rider = rider;
    }

    setTime(time: number): void {
        this.time = time;
    }
}

export { RiderTime };
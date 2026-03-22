class Coordonnee {
    lat: number;
    lng: number;

    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }

    getLat(): number {
        return this.lat;
    }

    getLng(): number {
        return this.lng;
    }

    setLat(lat: number): void {
        this.lat = lat;
    }

    setLng(lng: number): void {
        this.lng = lng;
    }
}

export { Coordonnee };
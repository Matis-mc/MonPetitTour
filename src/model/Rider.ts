class Rider {
    id: number;
    firstname: string;
    lastname: string;
    profile_image: string;

    constructor(id: number, firstname: string, lastname: string, profile_image: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.profile_image = profile_image;
    }

    getId(): number {
        return this.id;
    }

    getFirstname(): string {
        return this.firstname;
    }

    getLastname(): string {
        return this.lastname;
    }

    getProfileImage(): string {
        return this.profile_image;
    }

    setId(id: number): void {
        this.id = id;
    }

    setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    setProfileImage(profile_image: string): void {
        this.profile_image = profile_image;
    }
}

export { Rider };
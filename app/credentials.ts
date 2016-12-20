export class Credentials {
    private static user: string;

    public static getUser(): string {
        return Credentials.user;
    }

    public static setUser(user: string) {
        Credentials.user = user;
    }
}

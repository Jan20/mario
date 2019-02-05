export class MenuItem {

    ////////////////
    // Attributes //
    ////////////////
    private name: string;
    private icon: string;
    private link: string;

    ///////////////
    // Functions //
    ///////////////

    //////////////////
    // Constructors //
    //////////////////
    public constructor(name: string, icon: string, link: string) {

        this.name = name;
        this.icon = icon;
        this.link = link;

    }

    /////////////
    // Getters //
    /////////////
    public getName(): string {

        return this.name;

    }

    public getIcon(): string {

        return this.icon;

    }

    public getLink(): string {

        return this.link;

    }

    /////////////
    // Setters //
    /////////////
    public setName(name: string): void {

        this.name = name;

    }

    public setIcon(icon: string): void {

        this.icon = icon;

    }

    public setLink(link:string): void {

        this.link = link;

    }

}

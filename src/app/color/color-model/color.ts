export class Color {

    ///////////////
    // Variables //
    ///////////////
    private red: number
    private green: number
    private blue: number
    private label: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(red: number, green: number, blue: number, label: string) {

        this.red = red
        this.green = green
        this.blue = blue
        this.label = label

    }

    /////////////
    // Getters //      
    /////////////
    public getColor(): {red: number, green: number, blue: number, label: string}{
    
        return {
            
            red: this.red, 
            green: this.green, 
            blue: this.blue, 
            label: this.label}

    }

    public getRed(): number {

        return this.red

    }

    public getGreen(): number {

        return this.green

    }

    public getBlue(): number {

        return this.blue

    }

    public getLabel(): string {

        return this.label

    }

    /////////////
    // Setters //
    /////////////
    public setRed(red: number): void {

        this.red = red

    }

    public setGreen(green: number): void {

        this.green = green

    }

    public setBlue(blue: number): void {

        this.blue = blue

    }

    public setLabel(label: string): void {

        this.label = label

    }

}
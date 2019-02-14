import { Session } from "./session";

export class RankOption {

    ///////////////
    // Variables //
    ///////////////
    public option: string
    public session: Session

    //////////////////
    // Constructors //    
    //////////////////
    public constructor(option: string, session: Session) {

        this.option = option
        this.session = session

    }

}
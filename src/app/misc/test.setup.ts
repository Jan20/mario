import { UserService } from "../analytics/services/user.service";
import { SessionService } from "../analytics/services/session.service";
import { LevelService } from "../mario/services/level.service";

export class TestSetup {

    ///////////////
    // Variables //
    ///////////////

    //////////////////
    // Constructors //
    //////////////////
    public constructor(

        private userService: UserService,
        private sessionService: SessionService,
        private levelService: LevelService

    ) {}

    ///////////////
    // Functions //
    ///////////////
    public 

}
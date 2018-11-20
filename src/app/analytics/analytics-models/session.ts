import { GameplayData } from "./gameplayData";

export class Session {

    ///////////////
    // Variables //
    ///////////////
    private sessionKey: string
    private sessionId: number
    private gameplayData: GameplayData

    //////////////////
    // Constructors //
    //////////////////
    public constructor(sessionId?: number) {

        sessionId !== undefined ? this.sessionKey = this.generateKey(sessionId) : null
        this.gameplayData = new GameplayData()

    }
    
    ///////////////
    // Functions //
    ///////////////
    /**
     * 
     * Helper function to convert a session id stored
     * as a number to a string like id:1 => 'user001'.
     * 
     * @param sessionId: An user id as a number
     * 
     */
    private generateKey(sessionId: number): string {

        // Checks wether the user id is smaller than
        // ten leading to a result like 'user004'.
        if (sessionId < 10) return `session00${sessionId}`

        // If the user id is smaller than 100, a user
        // key like 'user095' should be returned.
        if (sessionId < 100) return `session0${sessionId}`

        // By default, an generic user key should
        // be returned. 
        return `session${sessionId}`

    }

    /////////////
    // Getters //
    /////////////
    public getSessionKey(): string {

        return this.sessionKey

    }

    public getSessionId(): number {

        return this.sessionId

    }

    public getGameplayData(): GameplayData {

        return this.gameplayData

    }

    /////////////
    // Setters //
    /////////////
    public setSessionKey(sessionKey: string): void {

        this.sessionKey = sessionKey

    }
    
    public setSessionId(sessionId: number): void {

        this.sessionId = sessionId

    }

    public setGameplayData(gameplayData: GameplayData): void {

        this.gameplayData = gameplayData

    }
 
}
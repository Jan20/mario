export class User {

    ///////////////
    // Variables //
    ///////////////
    public userId: string;
    public email: string;
    public photoURL?: string;
    public displayName?: string;
  
    //////////////////
    // Constructors //
    //////////////////
    public constructor(
    
        userId: string, 
        email: string, 
        photoURL?: string,
        displayName?: string,
    
    ) {
    
        this.userId = userId;
        this.email = email;
        this.photoURL = photoURL;
        this.displayName = displayName;
    
    }

    /////////////
    // Getters //
    /////////////
    public getUserId(): string {
    
        return this.userId;
    
    }

    public getEmail(): string {
    
        return this.email;
    
    }

    public getPhotoURL(): string {
    
        return this.photoURL;
    
    }

    public getDisplayName(): string {
    
        return this.displayName
    
    }

    /////////////
    // Setters //
    /////////////
    public setUserId(userId: string): void {
    
        this.userId = userId;
    
    }

    public setEmail(email: string): void {
    
        this.email = email;
    
    }

    public setPhotoURL(photoURL: string): void {
    
        this.photoURL = photoURL;
    
    }

    public setDisplayName(displayName: string): void {
    
        this.displayName = displayName
    
    }

}

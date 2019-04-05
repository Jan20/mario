import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  ///////////////
  // Variables //
  ///////////////
  public language = 'english'
  public languageSubject: Subject<string> = new Subject<string>()

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private userService: UserService

  ) { 

    this.languageSubject.next('english')

    this.init()

  }

  ///////////////
  // Functions //
  ///////////////
  public async init(): Promise<void> {

    const userKey: string = await this.userService.getCurrentUserKey()

    this.language = await this.userService.getLanguage(userKey)

    this.languageSubject.next(this.language)

  }

  public switchLanguage(userKey: string): void {

    this.language === 'english' ? this.language = 'german' : this.language = 'english'

    this.languageSubject.next(this.language)
    this.userService.storeLanguage(userKey, this.language)

  }

  public fetchLanguage(): void {

    this.languageSubject.next(this.language)

  }

}
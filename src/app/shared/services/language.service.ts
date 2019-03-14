import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
  public constructor() { 

    this.languageSubject.next('english')

  }

  ///////////////
  // Functions //
  ///////////////
  public switchLanguage(): void {

    this.language === 'english' ? this.language = 'german' : this.language = 'english'

    this.languageSubject.next(this.language)

  }

  public fetchLanguage(): void {

    this.languageSubject.next(this.language)

  }

}

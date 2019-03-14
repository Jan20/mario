import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { startWith, map } from 'rxjs/operators';
import { Option } from 'src/app/models/option';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-part12',
  templateUrl: './part12.component.html',
  styleUrls: ['./part12.component.scss']
})
export class Part12Component implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  /**
   * 
   * Refers to the language choosen by the user, which
   * can either by English or German.
   * 
   */
  public language: string = 'english'

  /**
   * 
   * Describes the question raised within in the current
   * part of survey with the option to get the quesion
   * in English or in German.
   * 
   */
  public question: Option = new Option(
  
    'What is your age?', 
    'Wie alt sind Sie?'
  
  )
  
  public message: Option = new Option(

    'Thank you for participating in the study. You may now close your browse window.',
    'Vielen Dank für Ihre Teilnahme an der Studie. Sie können jetzt Ihr Browserfenster schließen.'

  )
  
  public isStored: boolean = false

  /**
   * 
   * Declares an empty string serving as placeholder
   * for the user's answer.
   * 
   */
  public age: string = '0'
  public answer: string

  public ageControl = new FormControl();
  public ageOptions: string[] = []
  public filteredAgeOptions: Observable<string[]>;

  /**
   * 
   * Defines the text displayed on the progress
   * button at the bottom end of the page.
   * 
   */
  public button: Option = new Option('Continue', 'Weiter')

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private router: Router,
    private surveyService: SurveyService,
    private languageService: LanguageService,

  ) {

    for (let i = 13; i < 101; i++) {

      this.ageOptions.push('' + i)

    }

    // Updates the language variable every time
    // the user changes the language setting.
    this.languageService.languageSubject.subscribe(language => this.language = language)

    // Requests the lanuage service's current language.
    this.languageService.fetchLanguage()
  
    this.ageControl.valueChanges.subscribe(age => {
      
      this.age = age
      this.answer = age

    })
    this.filteredAgeOptions = this.ageControl.valueChanges.pipe(startWith(''), map(age => this.filter(age)))
   
  }
  
  public ngOnInit() {}
  
  ///////////////
  // Functions //
  ///////////////
  /**
   * 
   * Ensures that the user has the option to use
   * the enter key to progress to the next step
   * within the survey.
   * 
   * @param event: A keyboard event.
   * 
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    
    // Checks whether the user hit the enter key on 
    // his keyboard. If this is the case, the survey
    // progresses to the next part as long as the user
    // has given a valid answer in the current step.
    event.key === 'Enter' ? this.continue() : null
    
  }


  /**
   * 
   * Filters 
   * 
   * @param age 
   */
  private filter(age: string): string[] {
    
    return this.ageOptions.filter(option => option.toLowerCase().includes(age.toLowerCase()));
  
  }

  /**
   * 
   * Controls the transition to the next survey step.
   * 
   */
  public async continue(): Promise<void> {
        // Passes the given answer to the survey service. 
      if (this.answer != undefined) {

        await this.surveyService.survey.storeUsage(this.answer)
  
        await  this.surveyService.storeSurvey()
      
        this.isStored = true
  
      } 
    
  }
  
}











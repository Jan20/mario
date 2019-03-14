import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { startWith, map } from 'rxjs/operators';
import { Option } from 'src/app/models/option';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-part11',
  templateUrl: './part11.component.html',
  styleUrls: ['./part11.component.scss']
})
export class Part11Component implements OnInit {

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
  
    'What is your gender?', 
    'Bitte geben Sie ihr Geschlecht an.'
  
  )
  
  /**
   * 
   * Declares an empty string serving as placeholder
   * for the user's answer.
   * 
   */
  public gender: string = '0'
  public answer: string

  public genderControl = new FormControl();
  public genderOptionsEnglish: string[] = [
    
    'male',
    'female',
    'diverse',
    'prefer not state',
  
  ]

  public genderOptionsGerman: string[] = [
    
    'männlich',
    'weiblich',
    'divers',
    'mache lieber keine Angabe',
  
  ]

  public filteredGenderOptionsEnglish: Observable<string[]>;
  public filteredGenderOptionsGerman: Observable<string[]>;

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

    // Updates the language variable every time
    // the user changes the language setting.
    this.languageService.languageSubject.subscribe(language => this.language = language)

    // Requests the lanuage service's current language.
    this.languageService.fetchLanguage()
  
    this.genderControl.valueChanges.subscribe(gender => {
      
      this.gender = gender
      this.answer = gender

    })

    this.filteredGenderOptionsEnglish = this.genderControl.valueChanges.pipe(startWith(''), map(gender => this.filterEnglish(gender)))
    this.filteredGenderOptionsGerman = this.genderControl.valueChanges.pipe(startWith(''), map(gender => this.filterGerman(gender)))
   
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
   * @param gender 
   */
  private filterEnglish(gender: string): string[] {
    
    return this.genderOptionsEnglish.filter(option => option.toLowerCase().includes(gender.toLowerCase()));
  
  }

  private filterGerman(gender: string): string[] {
    
    return this.genderOptionsGerman.filter(option => option.toLowerCase().includes(gender.toLowerCase()));
  
  }

  /**
   * 
   * Controls the transition to the next survey step.
   * 
   */
  public async continue(): Promise<void> {
    
    // Passes the given answer to the survey service. 
    this.answer != undefined ? await this.surveyService.survey.storeGender(this.answer) : null

    // Checks whether a valid answer was given. If this is the case,
    // the user can progress to the next step of the survey.
    this.answer != undefined ? this.router.navigate(['survey/part_12']) : null
  
  }
  
}

import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { startWith, map } from 'rxjs/operators';
import { Option } from 'src/app/models/option';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-part7',
  templateUrl: './part7.component.html',
  styleUrls: ['./part7.component.scss']
})
export class Part7Component implements OnInit {

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
  
    'How many hours a week do you spend playing video games?', 
    'Wie viele Stunden pro Woche spielen Sie Videospiele?'
  
  )

  /**
   * 
   * Declares an empty string serving as placeholder
   * for the user's answer.
   * 
   */
  public usage: string
  public answer: string

  public usageControl = new FormControl();
  public usageOptionsEnglish: string[] = [
    
    '0',
    '1-3',
    '4-7',
    '8-10',
    '11-15',
    '16-20',
    'more than 15',
  
  ]

  public usageOptionsGerman: string[] = [
    
    '0',
    '1-3',
    '4-7',
    '8-10',
    '11-15',
    '16-20',
    'mehr als 20',
  
  ]

  public filteredUsageOptionsEnglish: Observable<string[]>;
  public filteredUsageOptionsGerman: Observable<string[]>;

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
  
    this.usageControl.valueChanges.subscribe(usage => {
      
      this.usage = usage
      this.answer = usage

    })

    this.filteredUsageOptionsEnglish = this.usageControl.valueChanges.pipe(startWith(''), map(usage => this.filterEnglish(usage)))
    this.filteredUsageOptionsGerman = this.usageControl.valueChanges.pipe(startWith(''), map(usage => this.filterGerman(usage)))
   
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
   * @param usage 
   */
  private filterEnglish(usage: string): string[] {
    
    return this.usageOptionsEnglish.filter(option => option.toLowerCase().includes(usage.toLowerCase()));
  
  }

  private filterGerman(usage: string): string[] {
    
    return this.usageOptionsGerman.filter(option => option.toLowerCase().includes(usage.toLowerCase()));
  
  }

  /**
   * 
   * Controls the transition to the next survey step.
   * 
   */
  public async continue(): Promise<void> {
    
    // Passes the given answer to the survey service. 
    this.usage != undefined ? await this.surveyService.survey.storeUsage(this.usage) : null

    // Checks whether a valid answer was given. If this is the case,
    // the user can progress to the next step of the survey.
    this.usage != undefined ? this.router.navigate(['survey/part_8']) : null

  
  }
  
}






import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Option } from 'src/app/models/option';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SurveyService } from '../../shared/services/survey.service';

@Component({
  selector: 'app-part3',
  templateUrl: './part3.component.html',
  styleUrls: ['./part3.component.scss']
})
export class Part3Component implements OnInit {

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
  
    'How would you judge the difficulty of the <b>second level</b>?', 
    'Wie würden Sie den Schwierigkeitsgrad des <b>zweiten Levels</b> bewerten?'
  
  )
  
  /**
   * 
   * Defines five options on a Likert scale.
   * 
   */
  public options: Option[] = [
    
    new Option('too easy', 'zu einfach'),
    new Option('easy', 'einfach'),
    new Option('appropriate', 'angemessen'),
    new Option('difficult', 'schwierig'),
    new Option('too difficult', 'zu schwierig')
    
  ]
  
  /**
   * 
   * Declares an empty string serving as placeholder
   * for the user's answer.
   * 
   */
  public answer: string = ''

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
    private languageService: LanguageService

  ) {
    
    // Updates the language variable every time
    // the user changes the language setting.
    this.languageService.languageSubject.subscribe(language => this.language = language)

    // Requests the lanuage service's current language.
    this.languageService.fetchLanguage()

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
   * Stores the answer given by the user
   * within the components scope.
   * 
   * @param answer: A string referring to the choosen option. 
   * 
   */
  public selectOption(answer: string): void {

    // Writes the answer given by the user
    // to a local variable.
    this.answer = answer
    
  }

  /**
   * 
   * Controls the transition to the next survey step.
   * 
   */
  public async continue(): Promise<void> {

    // Passes the given answer to the survey service. 
    this.answer != '' ? await this.surveyService.survey.storePreferedChallengeLevel(this.answer) : null

    // Checks whether a valid answer was given. If this is the case,
    // the user can progress to the next step of the survey.
    this.answer != '' ? this.router.navigate(['survey/part_4']) : null
  
  }
  
}

import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../../shared/services/survey.service';
import { Session } from 'src/app/models/session';
import { RankOption } from 'src/app/models/rankOption';
import { UserService } from 'src/app/shared/services/user.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { firestore } from 'firebase';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Option } from 'src/app/models/option';

@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.scss']
})
export class Part2Component implements OnInit {

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
  
    'Which of the two levels you just played did you find <b>more challenging</>?', 
    'Welches der beiden Level, die Sie gerade gespielt haben, war für Sie <b>anspruchsvoller</b>?'
  
  )

  // All recently finished sessions that serve as the input
  // of the survey section.
  public rankOptionsEnglish: RankOption[] = []
  public rankOptionsGerman: RankOption[] = []
  
  // Boolean variable indicating whether a hint showcasing
  // possible answers should be shown or not.
  public displayHint: boolean = false

  private rankOne: string = ''
  private rankTwo: string = ''
  
  
  /**
   * 
   * Defines the text displayed on the progress
   * button at the bottom end of the page.
   * 
   */
  public button: Option = new Option('Continue', 'Weiter')

  public isChosen: string = ''

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private router: Router,
    private userService: UserService,
    private sessionService: SessionService,
    private surveyService: SurveyService,
    private languageService: LanguageService

  ) {

    this.rankOptionsEnglish[0] = new RankOption('', new Session(null, null, null, null, null))
    this.rankOptionsEnglish[1] = new RankOption('', new Session(null, null, null, null, null))

    this.rankOptionsGerman[0] = new RankOption('', new Session(null, null, null, null, null))
    this.rankOptionsGerman[1] = new RankOption('', new Session(null, null, null, null, null))
    
    // Retrieves all recently finished sessions.
    this.initialize()

    this.languageService.languageSubject.subscribe(language => this.language = language)

    this.languageService.fetchLanguage()

  }

  public ngOnInit() {}

  ///////////////
  // Functions //
  ///////////////
  /**
   * 
   */
  private async initialize(): Promise<void> {

    const userKey: string = await this.userService.getCurrentUserKey()

    const sessions: Session[] = await this.sessionService.getSessions(userKey)

    let mostRecentSession: Session = new Session(null, null, null, firestore.Timestamp.fromMillis(0), null)
    let secondMostRecentSession: Session = new Session(null, null, null, firestore.Timestamp.fromMillis(0), null)

    sessions.forEach(session => {

      if (session.timestamp.toMillis() > mostRecentSession.timestamp.toMillis() && session.status == 'finished') {

        secondMostRecentSession = mostRecentSession
        mostRecentSession = session

      } 
      
    })
 
    this.rankOptionsEnglish[0] = new RankOption('First Level', secondMostRecentSession)
    this.rankOptionsEnglish[1] = new RankOption('Second Level', mostRecentSession)
    
    this.rankOptionsGerman[0] = new RankOption('Erstes Level', secondMostRecentSession)
    this.rankOptionsGerman[1] = new RankOption('Zweites Level', mostRecentSession)

  }

  /**
   * 
   * @param event 
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    
    event.key === 'Enter' ? this.continue() : null
    
  }
  
  
  public selectOption(rankOne: RankOption, rankTwo: RankOption): void {

    this.isChosen = rankOne.option

    this.rankOne = rankOne.session.key
    this.rankTwo = rankTwo.session.key
    
  }

  /**
   * 
   * Controls the transition to the next survey step.
   * 
   */
  public async continue(): Promise<void> {

    // Stores the given answers persistently at Firestore.
    this.rankOne != '' && this.rankTwo != '' ? await this.surveyService.survey.storeChallengeRanking(this.rankOne, this.rankTwo) : null

    // Checks wether all segments have been completed. If all conditions are met, the 
    // user can progress to the next step of the survey.
    this.rankOne != '' && this.rankTwo != ''  ? this.router.navigate(['survey/part_3']) : this.displayHint = true
  
  }

}

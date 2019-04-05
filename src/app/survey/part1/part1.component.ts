import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../../shared/services/survey.service';
import { Session } from 'src/app/models/session';
import { RankOption } from 'src/app/models/rankOption';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';
import { firestore } from 'firebase';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Option } from 'src/app/models/option';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class Part1Component implements OnInit {

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
  
    'Which of the two levels you just played was more <b>fun for you</b>?', 
    'Welches der beiden Levels, die Sie gerade gespielt haben, hat Ihnen mehr <b>Spaß gemacht</b>?'
  
  )
  
  // Defines the text displayed on the progress
  // button at the bottom end of the page.
  public button: Option = new Option('Continue', 'Weiter')
    
  // All recently finished sessions that serve as the input
  // of the survey section.
  public rankOptionsEnglish: RankOption[] = []
  public rankOptionsGerman: RankOption[] = []
  
  // Defines the variables needed for ranking previously
  // finished sessions.
  private rankOne: string = ''
  private rankTwo: string = ''
  
  // Defines the variable intentended to give the user a
  // clear response after selecting an option.
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

    // 
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

    // Gets the current user key.
    const userKey: string = await this.userService.getCurrentUserKey()

    // Gets all sessions of the current user.
    const recentSessions: Session[] = await this.sessionService.getSessions(userKey)

    // Generates two initial values for the most recently and second
    // most recently finished sessions.
    let mostRecentSession: Session = new Session(null, null, null, firestore.Timestamp.fromMillis(0), null)
    let secondMostRecentSession: Session = new Session(null, null, null, firestore.Timestamp.fromMillis(0), null)

    // Iterates over all recently finished sessions.
    recentSessions.forEach(session => {

      // Checks whether the session of the current iteration has been finished
      // after the session that has been stored in the 'mostRecentSession' variable
      // before. For the first two sessions within the 'recentSessions' array, this
      // holds true by default as those values are compared with the initial values
      // of the 'mostRecentSession' and 'secondMostRecentSession' variables which have
      // been initialized with zeros.
      if (session.timestamp.toMillis() > mostRecentSession.timestamp.toMillis() && session.status == 'finished') {

        // Writes the former most recently finished session to the
        // second most recently finished variable. 
        secondMostRecentSession = mostRecentSession
        mostRecentSession = session

      } 
      
    })
    
    // Creates the options, displayed to the user after the most recently finished
    // and second most recently finished sessions have been identified.
    this.rankOptionsEnglish[0] = new RankOption('First Level', secondMostRecentSession)
    this.rankOptionsEnglish[1] = new RankOption('Second Level', mostRecentSession)
    
    this.rankOptionsGerman[0] = new RankOption('Erstes Level', secondMostRecentSession)
    this.rankOptionsGerman[1] = new RankOption('Zweites Level', mostRecentSession)

  }

  /**
   * 
   * Simply event listender 
   * 
   * @param event: Keyboard event.
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    
    event.key === 'Enter' ? this.continue() : null
    
  }
  
  /**
   * 
   * 
   * 
   * @param rankOne 
   * @param rankTwo 
   */
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
    this.rankOne != '' && this.rankTwo != '' ? await this.surveyService.survey.storeFunRanking(this.rankOne, this.rankTwo) : null

    // Checks wether all segments have been completed. If all conditions are met, the 
    // user can progress to the next step of the survey.
    this.rankOne != '' && this.rankTwo != ''  ? this.router.navigate(['survey/part_2']) : null
  
  }

}

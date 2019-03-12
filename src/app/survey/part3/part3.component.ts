import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../../shared/services/survey.service';
import { Session } from 'src/app/models/session';
import { RankOption } from 'src/app/models/rankOption';
import { UserService } from 'src/app/shared/services/user.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-part3',
  templateUrl: './part3.component.html',
  styleUrls: ['./part3.component.scss']
})
export class Part3Component implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public answer: string
  public options: string[] = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree']

 
  // All recently finished sessions that serve as the input
  // of the survey section.
  public rankOptions: RankOption[] = []

  // Boolean variable indicating whether a hint showcasing
  // possible answers should be shown or not.
  public displayHint: boolean = false

  public active: string = ''

  private rankOne: string = ''
  private rankTwo: string = ''

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private userService: UserService,
    private sessionService: SessionService,
    private surveyService: SurveyService

  ) {

    this.rankOptions[0] = new RankOption('', new Session(null, null, null, null, null))
    this.rankOptions[1] = new RankOption('', new Session(null, null, null, null, null))

    // Retrieves all recently finished sessions.
    this.initialize().then(rankOptions => this.rankOptions = rankOptions)

  }
  
  private async initialize(): Promise<RankOption[]> {

    const userKey: string = await this.userService.getCurrentUserKey()

    const sessions: Session[] = await this.sessionService.getSessions(userKey)

    let mostRecentSession: Session = new Session(null, null, null, firestore.Timestamp.fromMillis(0), null)
    let secondMostRecentSession: Session = new Session(null, null, null, firestore.Timestamp.fromMillis(0), null)

    sessions.forEach(session => {

      if (session.timestamp.toMillis() > mostRecentSession.timestamp.toMillis()) {

        secondMostRecentSession = mostRecentSession
        mostRecentSession = session

      } 

    })

    let rankOptions: RankOption[] = []

    rankOptions[0] = new RankOption('First Level', secondMostRecentSession)
    rankOptions[1] = new RankOption('Second Level', mostRecentSession)
    
    return new Promise<RankOption[]>(resolve => resolve(rankOptions))

  }
  
  ngOnInit() {

  }
  
  public selectOption(rankOne: RankOption, rankTwo: RankOption): void {

    this.active = rankOne.option

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
     this.active != '' ? await this.surveyService.survey.storeChallengeRanking(this.rankOne, this.rankTwo) : null

    // Checks wether all segments have been completed. If all conditions are met, the 
    // user can progress to the next step of the survey.
    this.active != '' ? this.router.navigate(['survey/part_3']) : this.displayHint = true
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SurveyService } from '../services/survey.service';
import { Session } from 'src/app/models/session';
import { RankOption } from 'src/app/models/rankOption';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class Part1Component implements OnInit {

  ///////////////
  // Variables //
  ///////////////

  // Variables intended to store the ranks of the recently
  // finished sessions.
  public rank_01: RankOption
  public rank_02: RankOption
  public rank_03: RankOption

  // Form control Elemnets
  public rank01Control: FormControl = new FormControl();
  public rank02Control: FormControl = new FormControl();
  public rank03Control: FormControl = new FormControl();
  
  // Filtered options
  public filteredRank01Options: Observable<string[]>;
  public filteredRank02Options: Observable<string[]>;
  public filteredRank03Options: Observable<string[]>;

  // Array of rank options that consists of an identifier
  // such as 'First Level' and corresponding session object.
  public rankOptions: RankOption[] = []

  // Rank options that are shown to the users.
  public options: string[] = []
  
  // All recently finished sessions that serve as the input
  // of the survey section.
  public sessions: Session[] = []

  // Boolean variable indicating whether a hint showcasing
  // possible answers should be shown or not.
  public displayHint: boolean = false

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private surveyService: SurveyService

  ) {

    // Retrieves all recently finished sessions.
    this.sessions = this.surveyService.getRecentSessions()

    // Defines a list of identifiers that will later
    // be shown to the user.
    const identifiers: string[] = ['First Level', 'Second Level', 'Third Level']

    // Iterates over all recently finished sessions.
    this.sessions.forEach((session, i) => {
      
      // Pushes a new 'RankOption' object to the rankOptions array that
      // consists of an identifier with a corresponding session.
      this.rankOptions.push(new RankOption(identifiers[i], session))
      
      // Pushes an identifier to the options that are shown to the user.
      this.options.push(identifiers[i])

    })

    // Updates the options shown to the user after she has typed in the
    // beginning of an answer.
    this.filteredRank01Options = this.rank01Control.valueChanges.pipe(startWith(''), map(rank_01 => this.filter(rank_01)))
    this.filteredRank02Options = this.rank02Control.valueChanges.pipe(startWith(''), map(rank_02 => this.filter(rank_02)))
    this.filteredRank03Options = this.rank02Control.valueChanges.pipe(startWith(''), map(rank_03 => this.filter(rank_03)))

  }
  
  ngOnInit() {

    // Tries to store the answer given by the user whenever
    // the value of a form control is changing.
    this.rank01Control.valueChanges.subscribe(rank_01 => this.selectAnswer(rank_01, 1))
    this.rank02Control.valueChanges.subscribe(rank_02 => this.selectAnswer(rank_02, 2))
    this.rank03Control.valueChanges.subscribe(rank_03 => this.selectAnswer(rank_03, 3))

  }

  /**
   * 
   * Checks whether the user has given a valid response and 
   * stores the result temporarily
   * 
   * @param usersResponds: A string such as 'First Level', 'Second Level' and 'Third Level'.
   * @param formFieldId: Numeric id referring to a form field.
   */
  private selectAnswer(usersResponds: string, formFieldId: number): void {

    // Iterates over all valid options.
    this.rankOptions.forEach(rankOption => {

      // Checks whether the user has given a valid response such as 'First Level'.
      usersResponds === rankOption.option ? this.saveAnswer(rankOption, formFieldId) : null

    })

    // Checks whether the user's response is empty.
    if (usersResponds.length === 0) {
      
      // Removes a given answer from a local variable and pushes 
      // the option back on the array of possible answers.
      switch(formFieldId) {

        case 1: this.rank_01 ? this.options.push(this.rank_01.option) : null; this.rank_01 = undefined; break
        case 2: this.rank_01 ? this.options.push(this.rank_02.option) : null; this.rank_02 = undefined; break
        case 3: this.rank_01 ? this.options.push(this.rank_03.option) : null; this.rank_03 = undefined; break
  
      }
    }

  }

  /**
   * 
   * Writes a given user response to a local variable.
   * 
   * @param rankOption: A valid rankOption consisting of an identifier and a session.
   * @param formFieldId: Numeric Id referring to a form control.
   */
  private saveAnswer(rankOption: RankOption, formFieldId: number): void {
    
    // Removes the hint of possible answers, as the user has already choosen
    // a valid answer.
    this.displayHint = false
    
    // Writes the user's response in the correct local variable based
    // on the given form field id.
    switch(formFieldId) {

      case 1: this.rank_01 = rankOption; break
      case 2: this.rank_02 = rankOption; break
      case 3: this.rank_03 = rankOption; break

    }

    // Removes the given response from the possible answers
    // to discourage the user to give the same answer twice.
    this.options = this.options.filter(option => option != rankOption.option)

  }

  /**
   *
   *  Reduces the options shown to the user based on the user's input.
   *  
   * @param input: Any combination of characters.
   */
  private filter(input: string): string[] {
    
    // Returns a filtered list of options. 
    return this.options.filter(option => option.toLowerCase().includes(input.toLowerCase()));

  }

  /**
   * 
   * Controls the transition to the next survey step.
   * 
   */
  public async continue(): Promise<void> {

    // Defines a boolean variable indicating whether all segments have been completed.
    let isCompleted: boolean = false

    // Defines a range of boolean variables indicating whether single segments have been finished.
    let rank_01_completed: boolean = false 
    let rank_02_completed: boolean = false 
    let rank_03_completed: boolean = false 
    
    // Iterates over all rank options and checks whether a valid answer has been given.
    for (let rankOption of this.rankOptions) {

      this.rank_01 === rankOption ? rank_01_completed = true : null
      this.rank_02 === rankOption ? rank_02_completed = true : null
      this.rank_03 === rankOption ? rank_03_completed = true : null

    }

    // Checks whether all segments have been completed.
    isCompleted = (rank_01_completed && rank_02_completed && rank_03_completed) ? true : false

    // Stores the given answers persistently at Firestore.
    await this.surveyService.survey.storeFunRanking(
      
      this.rank_01.session.key, 
      this.rank_02.session.key, 
      this.rank_03.session.key
    
    )

    // Checks wether all segments have been completed. If all conditions are met, the 
    // user can progress to the next step of the survey.
    isCompleted ? this.router.navigate(['survey/part_2']) : this.displayHint = true
  
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../../shared/services/survey.service';

@Component({
  selector: 'app-part4',
  templateUrl: './part4.component.html',
  styleUrls: ['./part4.component.scss']
})
export class Part4Component implements OnInit {
  
  
  ///////////////
  // Variables //
  ///////////////
  opponent_type_1: string;
  opponent_type_1_options: string[] = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'];

  opponent_type_2: string;
  opponent_type_2_options: string[] = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'];

  opponent_type_3: string;
  opponent_type_3_options: string[] = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'];

  wide_gaps: string;
  wide_gaps_options: string[] = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'];

  number_of_opponents: string;
  number_of_opponents_options: string[] = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'];

  opponents_at_choke_points: string;
  opponents_at_choke_points_options: string[] = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'];


  
  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private surveyService: SurveyService

  ) {}

  ngOnInit(): void {

  }


  /**
   * 
   * Controls the transition to the next survey step.
   * 
   */
  public async continue(): Promise<void> {

    // Defines a boolean variable indicating whether all segments have been completed.
    let isCompleted: boolean = false

    // Checks whether all segments have been completed.
    isCompleted = (
      
      this.opponent_type_1 && 
      this.opponent_type_2 && 
      this.opponent_type_3 && 
      this.wide_gaps &&
      this.number_of_opponents &&
      this.opponents_at_choke_points
    
    ) ? true : false

    // Stores the given answers persistently at Firestore.
    isCompleted ? await this.surveyService.survey.storePerception(
      
      this.opponent_type_1,
      this.opponent_type_2,
      this.opponent_type_3,
      this.wide_gaps,
      this.number_of_opponents,
      this.opponents_at_choke_points
    
    ) : null

    // Checks wether all segments have been completed. If all conditions are met, the 
    // user can progress to the next step of the survey.
    isCompleted ? this.router.navigate(['survey/part_5']) : null
  
  }
}

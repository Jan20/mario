import { Component, OnInit, HostListener } from '@angular/core';
import { SurveyService } from '../survey-services/survey.service'

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  ///////////////
  // Variabels //
  ///////////////
  private status: string

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private surveyService: SurveyService

  ) { }

  ngOnInit() {

    this.surveyService.surveySubject.subscribe(status => this.setStatus(status))

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.keyCode === 13 || event.keyCode === 32 ) {

      this.surveyService.startExperiment()

    }
    
  }
    
  ///////////////
  // Functions //
  ///////////////
  public startExperiment(): void {

    this.surveyService.startExperiment()

  }

  /////////////
  // Getters //
  /////////////
  public getStatus(): string {

    return this.status

  }

  /////////////
  // Setters //
  /////////////
  public setStatus(status: string): void {

    this.status = status

  }

}

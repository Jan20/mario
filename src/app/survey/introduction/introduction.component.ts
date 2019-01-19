import { Component, OnInit, HostListener } from '@angular/core';
import { SurveyService } from '../survey-services/survey.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  ///////////////
  // Variabels //
  ///////////////
  private status: string

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private surveyService: SurveyService,
    private router: Router

  ) { }

  ngOnInit() {

    this.surveyService.surveySubject.subscribe(status => this.setStatus(status))

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    
    event.key === 'Enter' ? this.router.navigate(['/game']) : null
    
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

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/analytics/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  
  ///////////////
  // Variables //
  ///////////////
  public surveySubject: Subject<string> = new Subject<string>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private sessionService: SessionService

  ) { 

    sessionService.sessionSubject.subscribe(status => {

      // status === 'stored' ? this.surveySubject.next('ready') : null

    })

  }

  ///////////////
  // Functions //
  ///////////////
  public startExperiment() {

    this.surveySubject.next('running')

  }
}

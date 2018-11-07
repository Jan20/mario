import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
  constructor() { }

  ///////////////
  // Functions //
  ///////////////
  public startExperiment() {

    this.surveySubject.next('running')

  }
}

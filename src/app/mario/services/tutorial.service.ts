import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  public coinSubject: Subject<boolean> = new Subject<boolean>()
  public powerUpSubject: Subject<boolean> = new Subject<boolean>()
  public walkerSubject: Subject<boolean> = new Subject<boolean>()
  public jumperSubject: Subject<boolean> = new Subject<boolean>()
  public flyerSubject: Subject<boolean> = new Subject<boolean>()

  constructor() { }
}


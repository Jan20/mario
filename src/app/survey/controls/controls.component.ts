import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/analytics/services/session.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {


  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private sessionService: SessionService

  ) { }

  ngOnInit() {

    if (this.sessionService.tutorialHasBeenFinished === true) {

      this.sessionService.tutorialHasBeenFinished = false
      location.reload()

    }


  }

  ///////////////
  // Functions //
  ///////////////
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    
    event.key === 'Enter' ? this.proceed() : null
    
  }
    

  public proceed(): void {

    this.router.navigate(['game'])

  }

  public switchToTutorial(): void {

    this.router.navigate(['tutorial'])

  }

}

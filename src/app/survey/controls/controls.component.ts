import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public headline: string = ''
  public text: string = ''
  public control_0: string = ''
  public control_1: string = ''
  public control_2: string = ''
  public control_3: string = ''
  public button: string = ''

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private languageService: LanguageService

  ) { 

    this.languageService.languageSubject.subscribe(language => {

      if (language === 'english') {

        this.headline = 'Controls'
        this.text = 'You can control your avatar by using the following buttons. Please do not hesitate to try the tutorial before moving to the actual game to familiarize yourself with the controls.'
        this.control_0 = 'Move right'
        this.control_1 = 'Move left'
        this.control_2 = 'Jump'
        this.control_3 = 'Space: Shoot snow balls (after collecting a power-up)'
        this.button = 'Continue'

      } else {

        this.headline = 'Steuerung'
        this.text = 'Bitte benutzen Sie zur Steuerung die Pfeiltasten auf Ihrer Tastatur. Sie haben die Möglichkeit zunächst ein Tutorial zu spielen, um sich mit der Steuerung vertraut zu machen.'
        this.control_0 = 'Nach rechts bewegen'
        this.control_1 = 'Nach links bewegen'
        this.control_2 = 'Springen'
        this.control_3 = 'Leertaste: Schneeball feuern (nur mit einem Power-Up möglich)'
        this.button = 'Weiter'

      }

    })

    this.languageService.fetchLanguage()

  }

  ngOnInit() {}

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

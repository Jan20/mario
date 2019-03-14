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
        this.text = 'Please use the following buttons to move your avatar:'
        this.control_0 = 'Right arrow Key: Move right'
        this.control_1 = 'Left arrow key: Move left'
        this.control_2 = 'Up Key: Jump'
        this.control_3 = 'Space: Shoot snow balls (after collecting a power-up)'
        this.button = 'Continue'

      } else {

        this.headline = 'Steuerung'
        this.text = 'Bitte nutzen Sie folgende Tasten, um Ihren Figure zu bewegen:'
        this.control_0 = 'Rechte Pfeiltaste: Nach rechts bewegen'
        this.control_1 = 'Linke Pfeiltaste: Nach links bewegen'
        this.control_2 = 'obere Pfeiltaste: Springen'
        this.control_3 = 'Leertaste: Schneebälle schießen (nur mit einem Power-Up möglich)'
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

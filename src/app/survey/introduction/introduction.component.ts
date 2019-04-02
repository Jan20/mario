import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public headline: string = ''
  public text: string = ''
  public button: string = ''

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private languageService: LanguageService,

  ) { 

    this.languageService.languageSubject.subscribe(language => {

      if (language === 'english') {

        this.headline = 'Introduction'
        this.text = 'Thank you for participating in this study. You are invited to play <u><b>two levels</b></u> of a platform game and to answer a small survey afterwards which should not take more than 10 minutes in total.'
        this.button = 'Continue'

      } else {

        this.headline = 'Einführung'
        this.text = "Vielen Dank für die Teilnahme an dieser Studie. Sie haben die Chance <u><b>zwei Level</b></u> eines Jump'n'Run-Spiels zu spielen und anschließend eine kurze Umfrage zu beantworten. Zusammen sollte dies maximal 10 Minuten in Anspruch nehmen."
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
  
  /**
   * 
   * 
   * 
   */
  public proceed(): void {

    this.router.navigate(['description'])

  }


}

import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  
  public headline: string = ''
  public text: string = ''
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

        this.headline = 'The Game'
        this.text = 'The goal of of the game is to reach the end of a level as quickly as possible while collecting coins on the way. While progressing through the levels, you will encounter a range of opponents. Either avoid them by jumping over or destroy them by jumping right on top of them.'
        this.button = 'Continue'

      } else {

        this.headline = 'Das Spiel'
        this.text = "Das Ziel des Spiels ist es, so schnell wie möglich das Ende eines Levels zu erreichen, während Sie unterwegs Münzen sammeln. Während Sie durch die Levels gehen, werden Sie auf eine Reihe von Gegnern stoßen. Entweder vermeiden Sie sie, indem Sie springen oder sie zerstören, indem Sie direkt auf sie springen."
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

    this.router.navigate(['controls'])

  }

}

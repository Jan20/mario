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
        this.text = 'The goal of the game is to reach the end of a level as quickly as possible while collecting coins on the way. While progressing through the levels, you will encounter a range of opponents. If you touch them, you will be set back to the start and loose one of your three lifes. However, you can either avoid them by jumping over, or destroy them by jumping right on top of them.'
        this.button = 'Continue'

      } else {

        this.headline = 'Das Spiel'
        this.text = "Ziel des Spiels ist es, das Ende eines Levels so schnell wie möglich zu erreichen und Punkte durch das Sammlen von Münzen oder dem Besiegen von Gegnern zu erhalten. Wenn Sie mit Gegnern in Kontakt kommen, werden Sie an den Anfang des Levels zurückgesetzt und verlieren eines Ihrer drei Leben. Sie können Gegner jedoch ausweichen, indem Sie über sie springen oder sie zerstören, indem Sie direkt auf ihnen landen."
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

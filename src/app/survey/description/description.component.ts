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
        this.text = "<b>The game's goal is to reach the finish line at the end of a level as quickly as possible.</b> However, you can obtain a higher score by collecting coins or defeating opponents along the way. <br><br> <b>If you touch an opponent, you will be set back to the start and loose one of your three lifes</b>. However, you can either avoid opponents by jumping over, or destroy them by jumping right on top of them."
        this.button = 'Continue'

      } else {

        this.headline = 'Das Spiel'
        this.text = "<b>Ziel des Spiels ist es, die Ziellinie am Ende des Levels so schnell wie möglich zu erreichen</b>. Darüber hinaus können Sie Punkte durch das Sammlen von Münzen oder das Besiegen von Gegnern erhalten.<br><br> <b>Wenn Sie mit Gegnern in Berührung kommen, werden Sie an den Anfang des Levels zurückgesetzt und verlieren eines Ihrer drei Leben</b>. Sie können Gegnern jedoch ausweichen, indem Sie über sie springen oder sie zerstören, indem Sie direkt auf ihnen landen."
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

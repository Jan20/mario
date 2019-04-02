import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from '../menu-model/menu.item'
import { AudioService } from 'src/app/game/audio/audio.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title: string = ''
  public items: MenuItem[]
  public status: string
  public audioIsEnbabled: boolean = false
  private userKey: string
  public language: string = 'english'

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private userService: UserService,
    private audioService: AudioService,
    private sessionService: SessionService,
    private languageService: LanguageService
  
  ) {

    this.sessionService.statusSubject.subscribe(status => this.status = status)
    this.audioService.isEnabledSubject.subscribe(audioIsEnbabled => this.audioIsEnbabled = audioIsEnbabled)

    this.languageService.languageSubject.subscribe(language => this.language = language)
    this.languageService.fetchLanguage()

  }

  ngOnInit() {

    this.userService.getCurrentUserKey().then(userKey => this.userKey = userKey)

    window.innerWidth < 900 ? this.userService.storeDeviceType('mobile') : this.userService.storeDeviceType('desktop')
  
  }

  ///////////////
  // Functions //
  ///////////////
  public navigateToMenuEntry(item: MenuItem): void {

    this.router.navigate([item.getLink()])

  }

  public switchToLandingPage(): void {

    this.router.navigate([''])

  }
  /**
   * 
   * 
   * 
   */
  public toggleAudio(): void {

    this.audioService.toggleAudio()
 
  }
  
  public switchLanguage(): void {

    this.userKey != undefined ? this.languageService.switchLanguage(this.userKey) : null

  }

}

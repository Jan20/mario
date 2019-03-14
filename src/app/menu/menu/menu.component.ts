import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from '../menu-model/menu.item'
import { AudioService } from 'src/app/tux/audio/audio.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { LanguageService } from 'src/app/shared/services/language.service';

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
  public user: MenuItem
  public status: string
  public audioIsEnbabled: boolean = false

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private audioService: AudioService,
    private sessionService: SessionService,
    private languageService: LanguageService
  
  ) {
    

    this.sessionService.statusSubject.subscribe(status => this.status = status)
    this.audioService.isAllowedSubject.subscribe(audioIsEnbabled => this.audioIsEnbabled = audioIsEnbabled)
  
  }

  ngOnInit() {

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
  public toggleSound(): void {

    this.audioService.isAllowed ? this.disableSound() : this.enableSound()

    this.audioService.isAllowed && this.status === 'running' ? this.audioService.playTheme() : null

    !this.audioService.isAllowed ? this.audioService.theme.pause() : null
    
  }

  private enableSound(): void {

    this.audioService.isAllowedSubject.next(true)

  }

  private disableSound(): void {
    
    this.audioService.isAllowedSubject.next(false)

  }
  
  public switchLanguage(): void {

    this.languageService.switchLanguage()

  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  ///////////////
  // Variables //
  ///////////////

  // HTML Audio Elements intended to be initialized after the user
  // enables audio.
  public coin: HTMLAudioElement
  public powerUp: HTMLAudioElement 
  public stomp: HTMLAudioElement
  public lostLife: HTMLAudioElement
  public theme: HTMLAudioElement
  public finished: HTMLAudioElement
  
  // Boolean Variable which turns true if audio is enabled.
  public isEnabled: boolean = false

  // Boolean Variable intended to hold the status of the current session.
  public status: string

  // Boolean subject intended to switch whenever
  // The user decides to enable sound.
  public isEnabledSubject: Subject<boolean> = new Subject<boolean>()

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private sessionService: SessionService

  ) {

    this.sessionService.statusSubject.subscribe(status => this.status = status)

  }

  ///////////////
  // Functions //
  ///////////////

  /**
   * 
   * Switches the sound on and off.
   * 
   */
  public toggleAudio(): void {

    // Sets the 'isEnabled' boolean variable True if it is
    // has been False before and False if True before, respectively.
    this.isEnabled = !this.isEnabled

    // If audio has been enabled, all audio track are going to be
    // initialzed. 
    this.isEnabled ? this.createAudioElements() : null

    // Checks whether audio is allowed and a session has been started and
    // starts the main theme if the conditions are met.
    this.isEnabled && (this.status === 'running' || this.status === 'ready') ? this.playTheme() : null

    // Turns off all running audio tracks.
    !this.isEnabled ? this.stopMusic() : null

    // Propagates the current audio setting through the application.
    this.isEnabledSubject.next(this.isEnabled)

  }

  /**
   * 
   * Initializes all HTML audio elements with there
   * intented audio tracks.
   * 
   */
  public createAudioElements(): void {
    
    this.coin = new Audio('assets/audio/coin.wav')
    this.powerUp = new Audio('assets/audio/upgrade.wav')
    this.stomp = new Audio('assets/audio/fall.wav')
    this.lostLife = new Audio('assets/audio/LostLife.mp3')
    this.theme = new Audio('assets/audio/forest_theme.mp3')
    this.finished = new Audio('assets/audio/finished.mp3')
  
  }

  /**
   * 
   * Pauses all running audio tracks.
   * 
   */
  public stopMusic(): void {

    if(this.theme != undefined) {

      this.theme.pause()
      this.coin.pause()
      this.powerUp.pause()
      this.stomp.pause()

    }

  }

  public playTheme(): void {

    this.isEnabled ? this.theme.play() : null
    
  }

  public playCoin(): void {

    this.isEnabled ? this.coin.play() : null

  }

  public playPowerUp(): void {

    this.isEnabled ? this.powerUp.play() : null

  }

  public playStomp(): void {

    this.isEnabled ? this.stomp.play() : null

  }

  public playlostLife(): void {

    this.isEnabled ? this.lostLife.play() : null

  }

  public playFinished(): void {

    this.isEnabled ? this.finished.play() : null

  }

}

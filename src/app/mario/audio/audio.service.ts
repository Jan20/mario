import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  ///////////////
  // Variables //
  ///////////////
  public coin: HTMLAudioElement = new Audio('assets/Sound/coin.wav')
  public powerUp: HTMLAudioElement = new Audio('assets/Sound/upgrade.wav')
  public fireball: HTMLAudioElement = new Audio('assets/Sound/fireworks.wav')
  public stomp: HTMLAudioElement = new Audio('assets/Sound/fall.wav')
  public lostLife: HTMLAudioElement = new Audio('assets/Sound/LostLife.mp3')
  public theme: HTMLAudioElement = new Audio('assets/Sound/forest_theme.mp3')
  public finished: HTMLAudioElement = new Audio('assets/Sound/finished.mp3')
  public isAllowed: boolean = false

  public isAllowedSubject: Subject<boolean> = new Subject<boolean>()

  constructor() {

    this.isAllowedSubject.subscribe(isAllowed => {
      
      this.isAllowed = isAllowed
      
      if (!isAllowed) {

        this.theme.pause()
        this.coin.pause()
        this.powerUp.pause()
        this.fireball.pause()
        this.stomp.pause()
        this.lostLife.pause()
        
      }
      
    })

  }

  ///////////////
  // Functions //
  ///////////////
  public stopMusic(): void {

    this.theme.pause()
    this.coin.pause()
    this.powerUp.pause()
    this.fireball.pause()
    this.stomp.pause()

  }

  public playTheme(): void {

    this.isAllowed ? this.theme.play() : null

    
  }

  public playCoin(): void {

    this.isAllowed ? this.coin.play() : null

  }

  public playPowerUp(): void {

    this.isAllowed ? this.powerUp.play() : null

  }

  public playFireball(): void {

    this.isAllowed ? this.fireball.play() : null

  }

  public playStomp(): void {

    this.isAllowed ? this.stomp.play() : null

  }

  public playlostLife(): void {

    this.isAllowed ? this.lostLife.play() : null

  }

  public playFinished(): void {

    this.isAllowed ? this.finished.play() : null

  }

}

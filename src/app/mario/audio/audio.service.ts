import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  ///////////////
  // Variables //
  ///////////////
  public coin: HTMLAudioElement = new Audio('assets/Sound/Coin.mp3')
  public powerUp: HTMLAudioElement = new Audio('assets/Sound/PowerUpAppears.wav')
  public fireball: HTMLAudioElement = new Audio('assets/Sound/Fireball.wav')
  public stomp: HTMLAudioElement = new Audio('assets/Sound/Stomp.mp3')
  public lostLife: HTMLAudioElement = new Audio('assets/Sound/LostLife.mp3')
  public theme: HTMLAudioElement = new Audio('assets/Sound/Mario.mp3')
  public isAllowed: boolean = false

  constructor() {}

  ///////////////
  // Functions //
  ///////////////
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

}

import { Component, OnInit } from '@angular/core';
import { AudioService } from './audio.service';
import { SessionService } from 'src/app/analytics/services/session.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  status: string

  constructor(

    private audioService: AudioService,
    private sessionService: SessionService

  ) {

    this.sessionService.statusSubject.subscribe(status => this.status = status)


  }

  ngOnInit() {
  }

  ///////////////
  // Functions //
  ///////////////
  /**
   * 
   * 
   * 
   */
  public enableAudio(): void {

    this.audioService.isAllowed = this.audioService.isAllowed ? false : true

    this.audioService.isAllowed && this.status === 'running' ? this.audioService.playTheme() : null

    !this.audioService.isAllowed ? this.audioService.theme.pause() : null
    
  }

}
